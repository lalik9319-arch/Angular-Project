import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/auth.model';
import { User } from '../models/user.model';
import { Storege } from './storege';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private storage = inject(Storege);
  private Auth_URL = `${environment.apiUrl}/auth`;

  private currentUserSignal = signal<User | null>(this.storage.getUser());
  private isLogginSignal = signal<boolean>(this.storage.getToken() !== null);

  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isLoggedIn = this.isLogginSignal.asReadonly();
  private router = inject(Router);

  login(credentials: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.Auth_URL}/login`, credentials).pipe(
      tap((res) => this.handleAuthSuccess(res))
    );
  }

  register(credentials: RegisterRequest) {
    return this.http.post<AuthResponse>(`${this.Auth_URL}/register`, credentials).pipe(
      tap((res) => this.handleAuthSuccess(res))
    );
  }

  private handleAuthSuccess(res: AuthResponse) {
    this.storage.setToken(res.token);
    this.storage.setUser(res.user);

    this.isLogginSignal.set(true);
    this.currentUserSignal.set(res.user);
  }

  logout() {
    this.storage.setToken('');
    this.storage.setUser(null);
    this.isLogginSignal.set(false);
    this.currentUserSignal.set(null);
    this.router.navigate(['/login']);
  }
}