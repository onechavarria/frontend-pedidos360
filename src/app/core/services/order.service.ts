import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';
import { CartItem } from '../models/cart.model';
import { Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private readonly http: HttpClient) {}

  create(items: CartItem[], paymentId: string, shippingAddress: string): Observable<Order> {
    return this.http.post<Order>(`${API_BASE_URL}/pedidos`, {
      paymentId,
      shippingAddress,
      items: items.map((item) => ({ productId: item.product.id, quantity: item.quantity }))
    });
  }

  get(id: string): Observable<Order> { return this.http.get<Order>(`${API_BASE_URL}/pedidos/${id}`); }
  list(): Observable<Order[]> { return this.http.get<Order[]>(`${API_BASE_URL}/pedidos`); }
}
