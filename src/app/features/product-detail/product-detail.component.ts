import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { LanguageService } from '../../core/i18n/language.service';

@Component({ selector: 'app-product-detail', standalone: true, imports: [CurrencyPipe, DatePipe, NgIf, RouterLink], templateUrl: './product-detail.component.html', styleUrl: './product-detail.component.css' })
export class ProductDetailComponent {
  readonly product = signal<Product | null>(null); readonly loading = signal(true);
  constructor(route: ActivatedRoute, service: ProductService, public readonly i18n: LanguageService, private readonly cart: CartService, private readonly router: Router) {
    service.get(Number(route.snapshot.paramMap.get('id'))).subscribe((product) => { this.product.set(product ?? null); this.loading.set(false); });
  }
  add(): void { const product = this.product(); if (!product) return; this.cart.add(product); void this.router.navigate(['/cart']); }
}
