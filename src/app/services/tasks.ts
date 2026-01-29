import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EditTask, ResponseTask, Task } from '../models/task.model';
import { finalize, map, Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/tasks`;

  private _tasks = signal<ResponseTask[]>([]);
  private _isLoading = signal<boolean>(false);

  readonly tasksList = this._tasks.asReadonly();
  readonly isLoading = this._isLoading.asReadonly(); 
  getTasks(projectId?: number): Observable<ResponseTask[]> {
    this._isLoading.set(true);
    const url = projectId ? `${this.apiUrl}?projectId=${projectId}` : this.apiUrl;
    return this.http.get<ResponseTask[]>(url).pipe(
      tap(data => this._tasks.set(data)),
      finalize(() => this._isLoading.set(false))
    );
  }
  getTaskById(projectId: number, taskId: number): Observable<ResponseTask | undefined> {
    const task = this._tasks().find(t => t.id === taskId);
    if (task) {
      return of(task);
    }
    return this.getTasks(projectId).pipe(
      map(tasks => tasks.find(t => t.id === taskId))
    );
  }


  createTask(taskData: Task): Observable<ResponseTask> {
    return this.http.post<ResponseTask>(this.apiUrl, taskData).pipe(
      tap(newTask => this._tasks.update(all => [...all, newTask]))
    );
  }

  updateTask(taskId: number, changes: Partial<EditTask>) {
    return this.http.patch<ResponseTask>(`${this.apiUrl}/${taskId}`, changes).pipe(
      tap(updatedTask => {
        this._tasks.update(all =>
          all.map(t => t.id === taskId ? updatedTask : t)
        );
      })
    );
  }
  deleteTask(taskId: number) {
    return this.http.delete(`${this.apiUrl}/${taskId}`).pipe(
      tap(() => this._tasks.update(all => all.filter(t => t.id !== taskId)))
    );
  }
}