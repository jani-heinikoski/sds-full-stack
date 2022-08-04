import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authToken?: any;
  user?: any;

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<any> {
    return this.http.post('http://localhost:3000/users/register', user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
}
