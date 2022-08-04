import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
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
    this.authService.logout();
    this.showFlashMessageSuccess('You are logged out');
  }
}
