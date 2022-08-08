import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user?: User;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const onSuccess = (res: any) => {
      this.user = res?.profile;
    };

    const onError = (err: any) => {
      console.error(err);
    };

    this.authService.getProfile().subscribe({
      next: onSuccess,
      error: onError,
    });
  }
}
