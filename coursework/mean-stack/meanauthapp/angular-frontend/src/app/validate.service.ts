import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidateService {
  constructor() {}

  validateRegister(user: {
    name?: String;
    username?: String;
    email?: String;
    password?: String;
  }): boolean {
    let valid = true;
    Object.values(user).forEach((val) => {
      if (!val) {
        valid = false;
      }
    });
    return valid;
  }

  validateEmail(email?: String): boolean {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      ? true
      : false;
  }
}
