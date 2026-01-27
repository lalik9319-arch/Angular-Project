import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class Storege {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';
  
  setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }
  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  setUser(user: User): void {
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): User | null {
    const user = sessionStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

}
