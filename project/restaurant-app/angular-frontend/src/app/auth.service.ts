import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './user';
import { BaseURLService } from './base-url.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private helper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private baseURLService: BaseURLService
  ) {}

  registerUser(user: User): Observable<any> {
    return this.http.post(
      `${this.baseURLService.getBaseURL()}/users/register`,
      user,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  authenticateUser(user: User): Observable<any> {
    return this.http.post(
      `${this.baseURLService.getBaseURL()}/users/authenticate`,
      user,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.baseURLService.getBaseURL()}/users/profile`, {
      headers: new HttpHeaders({
        Authorization: `JWT ${window.localStorage.getItem('id_token')}` ?? '',
      }),
    });
  }

  storeAuthenticatedUser(user: User, token: string): void {
    window.localStorage.setItem('id_token', token);
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  removeAuthenticatedUser(): void {
    window.localStorage.removeItem('id_token');
    window.localStorage.removeItem('user');
  }

  isUserAuthenticated(): boolean {
    let loggedIn;
    try {
      loggedIn = !this.helper.isTokenExpired(
        window.localStorage.getItem('id_token') ?? undefined
      );
    } catch (err) {
      loggedIn = false;
    }
    return loggedIn;
  }
}
