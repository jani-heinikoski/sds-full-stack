import { Component, OnInit } from '@angular/core';

import { ValidateService } from '../validate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  name?: String;
  username?: String;
  email?: String;
  password?: String;

  constructor(private validateService: ValidateService) {}

  ngOnInit(): void {}

  onRegisterSubmit(): boolean {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
    };

    if (!this.validateService.validateRegister(user)) {
      console.log('please fill in all fields');
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      console.log('please fill a valid email');
      return false;
    }

    return true;
  }
}
