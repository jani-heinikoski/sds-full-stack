import { Component, OnInit } from '@angular/core';

import { FlashMessagesService } from 'flash-messages-angular';
import { ApiService } from '../api.service';
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
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {}

  private showFlashMessageAlert(text: string) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.flashMessagesService.show(text, {
      cssClass: 'alert-danger',
      timeout: 3000,
    });
  }

  private showFlashMessageSuccess(text: string) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
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
      this.authService.storeAuthenticatedUser(value.user, value.token);
    };

    this.apiService.authenticate(this.user).subscribe({
      next: onSuccess,
      error: onError,
    });
  }
}
