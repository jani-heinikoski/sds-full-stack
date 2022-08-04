import { Component, OnInit } from '@angular/core';

import { ValidateService } from '../validate.service';
import { FlashMessagesService } from 'flash-messages-angular';

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

  constructor(
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit(): void {}

  private showFlashMessageAlert(text: string) {
    this.flashMessagesService.show(text, {
      cssClass: 'alert-danger',
      timeout: 3000,
    });
  }

  onRegisterSubmit(): boolean {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
    };

    if (!this.validateService.validateRegister(user)) {
      this.showFlashMessageAlert('Please fill in all fields');
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      this.showFlashMessageAlert('Please fill a valid email');
      return false;
    }

    return true;
  }
}
