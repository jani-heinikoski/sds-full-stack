import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { MenuItem } from '../menu-item';
import { ValidateService } from '../validate.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  newItem: MenuItem = {
    name: '',
    price: 0,
    ingredients: [],
    category: 'Appetizer',
  };
  items?: MenuItem[];
  newIngredient: string = '';

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit(): void {
    const onSuccess = (res: any) => {
      this.items = res?.items;
    };

    const onError = (err: any) => {
      console.error(err);
    };

    this.apiService.getMenuItems().subscribe({
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

  addIngredient = (): void => {
    if (this.newIngredient === '') {
      this.showFlashMessageAlert('Ingredient input is empty');
      return;
    }
    this.newItem.ingredients?.push(this.newIngredient);
    this.newIngredient = '';
  };

  removeIngredient = (index: number): void => {
    this.newItem.ingredients?.splice(index, 1);
  };

  addItem = (): void => {
    if (!this.validateService.validateMenuItem(this.newItem)) {
      this.showFlashMessageAlert('Failed to add menu item, check all fields');
      return;
    }

    const onSuccess = (res: any) => {
      this.showFlashMessageSuccess(res?.msg);
      this.items?.push(res?.item);
      this.clearNewItemForm();
    };

    const onError = (err: any) => {
      this.showFlashMessageAlert(err?.msg);
    };

    this.apiService.postMenuItem(this.newItem).subscribe({
      next: onSuccess,
      error: onError,
    });
  };

  deleteItem(item: MenuItem) {
    const onSuccess = (res: any) => {
      this.showFlashMessageSuccess(res?.msg);
      const idx = this.items?.findIndex((i) => i._id === res?.item?._id);
      if (idx != undefined && idx !== -1) {
        this.items?.splice(idx, 1);
      }
    };

    const onError = (err: any) => {
      this.showFlashMessageAlert('Something went wrong.');
    };

    this.apiService.deleteMenuItem(item).subscribe({
      next: onSuccess,
      error: onError,
    });
  }

  isUserAuthenticated(): boolean {
    return this.authService.isUserAuthenticated();
  }

  handleKeyUp(e: any) {
    if (e.key === 'Enter') {
      switch (e.target.id) {
        case 'new-ingredient-input':
          this.addIngredient();
          break;
      }
    }
  }

  clearNewItemForm(): void {
    this.newIngredient = '';
    this.newItem = {
      name: '',
      price: 0,
      ingredients: [],
      category: 'Appetizer',
    };
  }
}
