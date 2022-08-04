import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token?: string;
  private user?: User;

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<any> {
    return this.http.post('http://localhost:3000/users/register', user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  authenticateUser(user: User): Observable<any> {
    return this.http.post('http://localhost:3000/users/authenticate', user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  storeUserData(user: User, token: string) {
    this.user = user;
    this.token = token;
  }

  logout() {
    this.user = undefined;
    this.token = undefined;
  }
}
