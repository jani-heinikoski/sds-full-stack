import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'flash-messages-angular';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { ValidateService } from '../validate.service';

@Component({
  selector: 'app-change-credentials',
  templateUrl: './change-credentials.component.html',
  styleUrls: ['./change-credentials.component.css'],
})
export class ChangeCredentialsComponent implements OnInit {
  user: User = {
    username: '',
    password: '',
  };

  constructor(
    private validateService: ValidateService,
    private apiService: ApiService,
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService
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

  changeCredentials(): void {
    if (this.validateService.validateNewCredentials(this.user)) {
      const onSuccess = (res: any) => {
        console.log(res);
        this.showFlashMessageSuccess('Credentials updated successfully');
        this.authService.updateAuthenticatedUser(res.user);
      };
      const onError = (err: any) => {
        console.error(err);
        this.showFlashMessageAlert(
          'Something went wrong, see console for more information'
        );
      };
      this.apiService.updateUserCredentials(this.user).subscribe({
        next: onSuccess,
        error: onError,
      });
    } else {
      this.showFlashMessageAlert('Invalid credentials');
    }
  }
}
