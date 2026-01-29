import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { finalize, Observable, tap } from 'rxjs';
import { Comment, NewComment } from '../models/comment.model';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/comments`;
  private _isLoading = signal<boolean>(false);
  readonly isLoading = this._isLoading.asReadonly();
  private _comments = signal<Comment[]>([]);
  readonly commentsList = this._comments.asReadonly();

  getComments(taskId: number): Observable<Comment[]> {
    this._isLoading.set(true);
    return this.http.get<Comment[]>(`${this.apiUrl}?taskId=${taskId}`).pipe(
      tap(comments => this._comments.set(comments)),
      finalize(() => this._isLoading.set(false))
    );
  }

  addComment(content: NewComment) {
    return this.http.post<Comment>(this.apiUrl, content).pipe(
      tap(newComment => this._comments.update(all => [newComment, ...all]))
    );
  }
}