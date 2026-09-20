import { AsyncPipe, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { AppLanguage, LanguageService } from '../../../core/i18n/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  readonly menuOpen = signal(false);

  constructor(
    public readonly auth: AuthService,
    public readonly cart: CartService,
    public readonly i18n: LanguageService,
    private readonly router: Router
  ) {}

  toggleMenu(): void { this.menuOpen.update((open) => !open); }
  closeMenu(): void { this.menuOpen.set(false); }
  changeLanguage(value: string): void { this.i18n.setLanguage(value as AppLanguage); }

  async logout(): Promise<void> {
    await this.auth.logout();
    this.closeMenu();
    await this.router.navigate(['/']);
  }
}
