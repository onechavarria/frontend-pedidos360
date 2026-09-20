import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Order } from '../../core/models/order.model';
import { OrderService } from '../../core/services/order.service';
import { LanguageService } from '../../core/i18n/language.service';

@Component({ selector: 'app-orders', standalone: true, imports: [CurrencyPipe, DatePipe, NgFor, NgIf, RouterLink], templateUrl: './orders.component.html', styleUrl: './orders.component.css' })
export class OrdersComponent {
  readonly orders = signal<Order[]>([]); readonly selected = signal<Order | null>(null); readonly loading = signal(true); readonly error = signal('');
  constructor(route: ActivatedRoute, service: OrderService, public readonly i18n: LanguageService) {
    // Si la URL contiene un id mostramos el detalle; de lo contrario, el historial completo.
    route.paramMap.subscribe((params) => {
      const id = params.get('id'); this.loading.set(true); this.error.set('');
      const onError = (error: HttpErrorResponse) => {
        this.error.set(error.error?.message ?? 'No fue posible cargar tus pedidos.');
        this.loading.set(false);
      };
      if (id) {
        service.get(id).subscribe({ next: (order) => { this.selected.set(order); this.loading.set(false); }, error: onError });
      } else {
        this.selected.set(null);
        service.list().subscribe({ next: (orders) => { this.orders.set(orders); this.loading.set(false); }, error: onError });
      }
    });
  }
}
