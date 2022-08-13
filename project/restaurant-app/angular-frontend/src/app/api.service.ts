import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseURLService } from './base-url.service';
import { AuthService } from './auth.service';

import { User } from './user';
import { MenuItem } from './menu-item';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private baseURLService: BaseURLService,
    private authService: AuthService
  ) {}

  private createHeaders(
    contentTypeAppJSON: boolean,
    authorizationToken: boolean
  ): { headers: HttpHeaders } {
    let httpHeaders = new HttpHeaders();
    if (contentTypeAppJSON) {
      httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    }
    if (authorizationToken) {
      httpHeaders = httpHeaders.set(
        'Authorization',
        this.authService.getAuthorizationToken()
      );
    }
    return { headers: httpHeaders };
  }

  private createURL(relativeEndpoint: string): string {
    return this.baseURLService.getBaseURL() + relativeEndpoint;
  }

  public authenticate(user: User): Observable<any> {
    return this.http.post(
      this.createURL('/user/authenticate'),
      user,
      this.createHeaders(true, false)
    );
  }

  public register(user: User): Observable<any> {
    return this.http.post(
      this.createURL('/user/register'),
      user,
      this.createHeaders(true, false)
    );
  }

  public getProfile(): Observable<any> {
    return this.http.get(
      this.createURL('/user/profile'),
      this.createHeaders(false, true)
    );
  }

  public getMenuItems(): Observable<any> {
    return this.http.get(this.createURL('/menu/items'));
  }

  public postMenuItem(menuItem: MenuItem): Observable<any> {
    return this.http.post(
      this.createURL('/menu/items'),
      { item: menuItem },
      this.createHeaders(true, true)
    );
  }

  public deleteMenuItem(menuItem: MenuItem): Observable<any> {
    return this.http.delete(
      this.createURL(`/menu/items/${menuItem._id}`),
      this.createHeaders(false, true)
    );
  }

  public getOpeningHours(): Observable<any> {
    return this.http.get(
      this.createURL('/opening-hour'),
      this.createHeaders(false, false)
    );
  }
}
