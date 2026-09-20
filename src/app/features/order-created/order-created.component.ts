import { NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Order } from '../../core/models/order.model';
import { OrderService } from '../../core/services/order.service';
import { LanguageService } from '../../core/i18n/language.service';

@Component({ selector: 'app-order-created', standalone: true, imports: [NgIf, RouterLink], templateUrl: './order-created.component.html', styleUrl: './order-created.component.css' })
export class OrderCreatedComponent {
  readonly order = signal<Order | null>(null); readonly loading = signal(true);
  constructor(route: ActivatedRoute, service: OrderService, public readonly i18n: LanguageService) { service.get(route.snapshot.paramMap.get('id') ?? '').subscribe({ next: (order) => { this.order.set(order); this.loading.set(false); }, error: () => this.loading.set(false) }); }
}
