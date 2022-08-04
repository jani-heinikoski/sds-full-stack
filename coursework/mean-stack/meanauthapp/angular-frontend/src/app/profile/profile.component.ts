import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user?: User;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const onSuccess = (value: any) => {
      try {
        this.user = JSON.parse(window.localStorage.getItem('user') ?? '');
      } catch (err) {
        console.error(err);
      }
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
