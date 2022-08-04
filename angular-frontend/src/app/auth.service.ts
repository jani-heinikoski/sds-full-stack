import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private helper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<any> {
    return this.http.post('/users/register', user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  authenticateUser(user: User): Observable<any> {
    return this.http.post('/users/authenticate', user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  getProfile(): Observable<any> {
    return this.http.get('/users/profile', {
      headers: new HttpHeaders({
        Authorization: `JWT ${window.localStorage.getItem('id_token')}` ?? '',
      }),
    });
  }

  storeUserData(user: User, token: string): void {
    window.localStorage.setItem('id_token', token);
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  logout(): void {
    window.localStorage.removeItem('id_token');
    window.localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !this.helper.isTokenExpired(
      window.localStorage.getItem('id_token') ?? undefined
    );
  }
}
