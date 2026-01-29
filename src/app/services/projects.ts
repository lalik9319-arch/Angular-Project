import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { NewProject, Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private http = inject(HttpClient);
  private _projects = signal<Project[]>([]);
  private _isLoading = signal<boolean>(false);
  readonly projectsList = this._projects.asReadonly();
  private API_URL = `${environment.apiUrl}/projects`;
  readonly isLoading = this._isLoading.asReadonly();

  getProjects(): Observable<Project[]> {
    this._isLoading.set(true);
    return this.http.get<Project[]>(this.API_URL).pipe(
      tap(data => this._projects.set(data)),
      finalize(() => this._isLoading.set(false))
    );
  }

  addProject(projectNew: NewProject): Observable<Project> {
    return this.http.post<Project>(this.API_URL, projectNew).pipe(
      tap(newProj => this._projects.update(projs => [...projs, newProj]))
    );
  }
}