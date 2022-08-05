import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from '../auth.service';

import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = {};

  constructor(
    private router: Router,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  private showFlashMessageAlert(text: string) {
    this.flashMessagesService.show(text, {
      cssClass: 'alert-danger',
      timeout: 5000,
    });
  }

  private showFlashMessageSuccess(text: string) {
    this.flashMessagesService.show(text, {
      cssClass: 'alert-success',
      timeout: 3000,
    });
  }

  onLoginSubmit() {
    const onError = (err: any): void => {
      this.showFlashMessageAlert('Wrong username or password');
    };

    const onSuccess = (value: any): void => {
      this.showFlashMessageSuccess('You are now logged in!');
      this.authService.storeUserData(value.user, value.token);
    };

    this.authService.authenticateUser(this.user).subscribe({
      next: onSuccess,
      error: onError,
    });
  }
}
