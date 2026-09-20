import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly storageKey = 'pedidos360_cart_v4';
  readonly items$ = new BehaviorSubject<CartItem[]>(this.load());

  add(product: Product): void {
    const items = structuredClone(this.items$.value);
    const found = items.find((item) => item.product.id === product.id);
    if (found) found.quantity = Math.min(found.quantity + 1, product.stock);
    else items.push({ product, quantity: 1 });
    this.save(items);
  }

  update(id: number, quantity: number): void {
    this.save(this.items$.value.map((item) => item.product.id === id ? { ...item, quantity } : item));
  }

  remove(id: number): void { this.save(this.items$.value.filter((item) => item.product.id !== id)); }
  clear(): void { this.save([]); }
  count(): number { return this.items$.value.reduce((sum, item) => sum + item.quantity, 0); }
  total(): number { return this.items$.value.reduce((sum, item) => sum + item.product.precio * item.quantity, 0); }

  private load(): CartItem[] {
    try { return JSON.parse(localStorage.getItem(this.storageKey) ?? '[]') as CartItem[]; }
    catch { return []; }
  }

  private save(items: CartItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.items$.next(items);
  }
}

