import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginRequest } from '../../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private Auth_URL = `${environment.apiUrl}/auth` ;

  login(user : LoginRequest ) {
    return this.http.post<AuthResponse>(
      `${this.Auth_URL}/login`,
      user
    );
  }
}
