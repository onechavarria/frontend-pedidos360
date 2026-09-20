import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { PaymentService } from '../../core/services/payment.service';
import { LanguageService } from '../../core/i18n/language.service';

@Component({ selector: 'app-checkout', standalone: true, imports: [AsyncPipe, CurrencyPipe, FormsModule, NgFor, NgIf], templateUrl: './checkout.component.html', styleUrl: './checkout.component.css' })
export class CheckoutComponent {
  readonly processing = signal(false); readonly error = signal('');
  card = '4242 4242 4242 4242'; expiration = '12 / 29'; cvc = '123'; country = 'Chile'; postalCode = '8320000'; shippingAddress = '';
  constructor(public readonly cart: CartService, public readonly auth: AuthService, public readonly i18n: LanguageService, private readonly payments: PaymentService, private readonly orders: OrderService, private readonly router: Router) {}

  placeOrder(): void {
    if (!this.cart.count() || this.processing()) return;
    if (this.shippingAddress.trim().length < 8) { this.error.set('Ingresa una dirección de envío válida.'); return; }
    const digits = this.card.replace(/\D/g, '');
    if (digits.length < 4) { this.error.set('Revisa el número de tarjeta demostrativa.'); return; }

    this.processing.set(true); this.error.set('');
    const items = this.cart.items$.value;
    this.payments.pay(this.cart.total(), digits.slice(-4)).pipe(
      switchMap((payment) => this.orders.create(items, payment.id, this.shippingAddress.trim()))
    ).subscribe({
      next: async (order) => { this.cart.clear(); await this.router.navigate(['/order-created',order.id]); },
      error: (error) => { this.processing.set(false); this.error.set(error.error?.message ?? 'No fue posible completar el pedido.'); }
    });
  }
}
