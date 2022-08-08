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
    this.items = [
      {
        _id: 'obj121321321',
        name: 'Example food 1',
        ingredients: ['Steak', 'Fries', '10M calories'],
        price: 12.54,
        category: 'Appetizer',
      },
      {
        _id: 'obj121321322',
        name: 'Example food 2',
        ingredients: ['More steak', 'Even more fries', '15M calories'],
        price: 14.54,
        category: 'Appetizer',
      },
      {
        _id: 'obj121321323',
        name: 'Example dinner 1',
        ingredients: ['Chicken', 'Rice', '0 calories'],
        price: 212.54,
        category: 'Main Course',
      },
      {
        _id: 'obj121321324',
        name: 'Example dinner 2',
        ingredients: ['Water', 'Even more water', '-1e6 calories'],
        price: 134.54,
        category: 'Main Course',
      },
    ];
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
