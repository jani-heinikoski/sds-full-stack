import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user?: User;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    const onSuccess = (res: any) => {
      this.user = res?.profile;
    };

    const onError = (err: any) => {
      console.error(err);
    };

    this.apiService.getProfile().subscribe({
      next: onSuccess,
      error: onError,
    });
  }
}
