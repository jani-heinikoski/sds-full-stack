import { Injectable } from '@angular/core';

import { MenuItem } from './menu-item';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class ValidateService {
  constructor() {}

  validateEmail(email?: String): boolean {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      ? true
      : false;
  }

  validateMenuItem(menuItem: MenuItem): boolean {
    return menuItem &&
      menuItem.name &&
      menuItem.category &&
      menuItem.ingredients &&
      menuItem.category &&
      menuItem.price != undefined &&
      menuItem.price >= 0
      ? true
      : false;
  }

  validateCredentials(user: User): boolean {
    return user && user.username?.length && user.password?.length
      ? true
      : false;
  }
}
