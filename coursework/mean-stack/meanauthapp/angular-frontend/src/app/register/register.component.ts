import { Component, OnInit } from '@angular/core';

import { ValidateService } from '../validate.service';
import { FlashMessagesService } from 'flash-messages-angular';

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
    if (!this.validateService.validateRegister(this.user)) {
      this.showFlashMessageAlert('Please fill in all fields');
      return false;
    }

    if (!this.validateService.validateEmail(this.user.email)) {
      this.showFlashMessageAlert('Please fill a valid email');
      return false;
    }

    return true;
  }
}
