import { Component, OnInit } from '@angular/core';

import { FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  private showFlashMessageSuccess(text: string) {
    this.flashMessagesService.show(text, {
      cssClass: 'alert-success',
      timeout: 3000,
    });
  }

  onLogoutClick() {
    this.authService.removeAuthenticatedUser();
    this.showFlashMessageSuccess('You are logged out');
  }

  isUserAuthenticated() {
    return this.authService.isUserAuthenticated();
  }
}
