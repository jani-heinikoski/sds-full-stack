import { Component, OnInit } from '@angular/core';

import { FlashMessagesService } from 'flash-messages-angular';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

import { OpeningHours } from '../opening-hours';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  openingHours?: OpeningHours;
  selectedDay: string = '';
  openingHour: string = '';

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit(): void {
    const onSuccess = (res: any) => {
      this.openingHours = res.openingHours;
    };

    const onError = (err: any) => {
      console.error(err);
    };

    this.apiService.getOpeningHours().subscribe({
      next: onSuccess,
      error: onError,
    });
  }

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

  updateOpeningHour(): void {
    if (
      this.openingHour !== '' &&
      this.selectedDay !== '' &&
      this.openingHours
    ) {
      this.openingHours[this.selectedDay] = this.openingHour;
      this.showFlashMessageSuccess('Opening hour changed!');
      this.openingHour = '';
      this.selectedDay = '';
    } else {
      this.showFlashMessageAlert(
        'Error: make sure you have selected a day and entered an opening hour'
      );
    }
  }

  getOpeningHoursKeys(): string[] {
    return Object.keys(this.openingHours || {});
  }

  isUserAuthenticated(): boolean {
    return this.authService.isUserAuthenticated();
  }

  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
