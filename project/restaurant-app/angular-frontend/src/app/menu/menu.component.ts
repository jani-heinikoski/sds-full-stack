import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MenuItem } from '../menu-item';
import { ValidateService } from '../validate.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  newItem: MenuItem = {};
  items?: MenuItem[];

  constructor(
    private authService: AuthService,
    private validateService: ValidateService
  ) {}

  ngOnInit(): void {
    const onSuccess = (res: any) => {
      this.items = res?.items;
    };

    const onError = (err: any) => {
      console.error(err);
    };

    this.authService.getMenuItems().subscribe({
      next: onSuccess,
      error: onError,
    });
  }

  formatIngredients = (ingredients: string[] | undefined) => {
    if (!ingredients) return null;
    let formattedIngredients: string = '';
    for (let i = 0; i < ingredients.length; i++) {
      if (i === ingredients.length - 1) {
        formattedIngredients += ingredients[i];
      } else {
        formattedIngredients += ingredients[i] + ', ';
      }
    }
    return formattedIngredients;
  };

  addItem = () => {
    if (!this.validateService.validateMenuItem(this.newItem)) return;
    // POST new menu item and add to menu
  };

  removeMenuItem = (_id?: string) => {
    if (!_id) return;
    // DELETE menu item and remove from menu
  };

  isUserAuthenticated(): boolean {
    return this.authService.isUserAuthenticated();
  }
}
