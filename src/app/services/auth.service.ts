import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from './api-constants';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  // fakestore expects { username, password }
  login(credentials: { username: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${API.FAKESTORE}/auth/login`, credentials)
      .pipe(map(res => {
        if (res && res.token) {
          localStorage.setItem('token', res.token);
        }
        return res;
      }));
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
