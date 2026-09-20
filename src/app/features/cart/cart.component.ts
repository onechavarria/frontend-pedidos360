import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { LanguageService } from '../../core/i18n/language.service';

@Component({ selector: 'app-cart', standalone: true, imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink], templateUrl: './cart.component.html', styleUrl: './cart.component.css' })
export class CartComponent {
  constructor(public readonly cart: CartService, public readonly i18n: LanguageService) {}
  changeQuantity(productId: number, event: Event): void { this.cart.update(productId, Number((event.target as HTMLSelectElement).value)); }
}
