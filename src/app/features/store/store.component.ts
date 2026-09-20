import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { LanguageService } from '../../core/i18n/language.service';

@Component({
  selector: 'app-store', standalone: true, imports: [CurrencyPipe, NgFor, NgIf, RouterLink],
  templateUrl: './store.component.html', styleUrl: './store.component.css'
})
export class StoreComponent {
  readonly products = signal<Product[]>([]);
  readonly search = signal('');
  readonly loading = signal(true);
  readonly filtered = computed(() => {
    const term = this.search().trim().toLocaleLowerCase('es');
    return term ? this.products().filter((product) => `${product.nombre} ${product.categoria}`.toLocaleLowerCase('es').includes(term)) : this.products();
  });

  constructor(service: ProductService, public readonly i18n: LanguageService) {
    service.list().subscribe((products) => { this.products.set(products); this.loading.set(false); });
  }

  updateSearch(event: Event): void { this.search.set((event.target as HTMLInputElement).value); }
}
