import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'auth_token';

  constructor(private readonly http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>('/auth/login', credentials).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
      })
    );
  }

  getUserContext(): Observable<AuthUser> {
    return this.http.get<AuthUser>('/auth/context');
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  updatePassword(password: string): Observable<void> {
    return this.http.put<void>('/auth/users/password', { password });
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }
}
