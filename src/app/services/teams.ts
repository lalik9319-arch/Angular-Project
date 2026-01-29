import { inject, Injectable, signal } from '@angular/core';
import { Team, TeamMember } from '../models/team.model';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',

})

export class Teams {
  private http = inject(HttpClient);
  private _teams = signal<Team[]>([]);
  private _isLoading = signal<boolean>(false);

  readonly isLoading = this._isLoading.asReadonly();
  readonly teamsList = this._teams.asReadonly();
  private API_URL = `${environment.apiUrl}/teams`;

  getTeams(): Observable<Team[]> {
    this._isLoading.set(true);
    return this.http.get<Team[]>(this.API_URL).pipe(
      tap(data => this._teams.set(data)),
      finalize(() => this._isLoading.set(false))
    );
  }

  addTeam(name: string): Observable<Team> {
    return this.http.post<Team>(this.API_URL, { name }).pipe(
      tap(newTeam => this._teams.update(teams => [...teams, newTeam]))
    );
  }

  addMemberToTeam(member: TeamMember, teamId: number): Observable<void> {
    return this.http.post<void>(this.API_URL + `/${teamId}/members`, member).pipe(
      tap(() => {
        this._teams.update(teams =>
          teams.map(team =>
            team.id === teamId
              ? { ...team, members_count: (team.members_count || 0) + 1 }
              : team
          )
        );
      })
    );
  }
}