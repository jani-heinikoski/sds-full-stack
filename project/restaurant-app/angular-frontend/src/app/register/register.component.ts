import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ValidateService } from '../validate.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from '../auth.service';

import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User = {};

  constructor(
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  private showFlashMessageAlert(text: string) {
    this.flashMessagesService.show(text, {
      cssClass: 'alert-danger',
      timeout: 3000,
    });
  }

  private showFlashMessageSuccess(text: string) {
    this.flashMessagesService.show(text, {
      cssClass: 'alert-success',
      timeout: 3000,
    });
  }

  onRegisterSubmit(): void {
    if (!this.validateService.validateRegister(this.user)) {
      this.showFlashMessageAlert('Please fill in all fields');
      return;
    }

    if (!this.validateService.validateEmail(this.user.email)) {
      this.showFlashMessageAlert('Please fill a valid email');
      return;
    }

    const onError = (err: any): void => {
      console.error(err);
      this.showFlashMessageAlert(
        'Something went wrong, see console for more information.'
      );
    };

    const onSuccess = (value: any): void => {
      this.showFlashMessageSuccess('You are now registered and can log in!');
      this.router.navigate(['login']);
    };

    this.authService.registerUser(this.user).subscribe({
      next: onSuccess,
      error: onError,
    });
  }
}
