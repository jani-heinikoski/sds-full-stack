import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

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
      `${this.baseURLService.getBaseURL()}/user/register`,
      user,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  authenticateUser(user: User): Observable<any> {
    return this.http.post(
      `${this.baseURLService.getBaseURL()}/user/authenticate`,
      user,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.baseURLService.getBaseURL()}/user/profile`, {
      headers: new HttpHeaders({
        Authorization: `JWT ${window.localStorage.getItem('id_token')}` ?? '',
      }),
    });
  }

  getMenuItems(): Observable<any> {
    return of({
      items: [
        {
          _id: 'obj121321321',
          name: 'Example food 1',
          ingredients: ['Steak', 'Fries', '10M calories'],
          price: 12.54,
          category: 'Appetizer',
        },
        {
          _id: 'obj121321322',
          name: 'Example food 2',
          ingredients: ['More steak', 'Even more fries', '15M calories'],
          price: 14.54,
          category: 'Appetizer',
        },
        {
          _id: 'obj121321323',
          name: 'Example dinner 1',
          ingredients: ['Chicken', 'Rice', '0 calories'],
          price: 212.54,
          category: 'Main Course',
        },
        {
          _id: 'obj121321324',
          name: 'Example dinner 2',
          ingredients: ['Water', 'Even more water', '-1e6 calories'],
          price: 134.54,
          category: 'Main Course',
        },
      ],
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
