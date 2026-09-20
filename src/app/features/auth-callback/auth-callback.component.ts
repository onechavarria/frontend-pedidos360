import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-auth-callback', standalone: true, imports: [NgIf, RouterLink],
  template: `<section class="callback"><div class="spinner" *ngIf="!error()"></div><h1>{{ error() ? 'No pudimos iniciar sesión' : 'Validando tu acceso...' }}</h1><p>{{ error() || 'Esto tomará solo un momento.' }}</p><a *ngIf="error()" routerLink="/auth/login">Volver a iniciar sesión</a></section>`,
  styles: [`.callback{min-height:60vh;display:grid;place-content:center;text-align:center;padding:30px}.spinner{width:48px;height:48px;margin:0 auto 18px;border:4px solid #dbeafe;border-top-color:#2563eb;border-radius:50%;animation:spin .8s linear infinite}.callback h1{margin:0 0 8px;color:#172033}.callback p{color:#667085}.callback a{color:#2563eb;font-weight:700}@keyframes spin{to{transform:rotate(360deg)}}`]
})
export class AuthCallbackComponent {
  readonly error = signal('');
  constructor(route: ActivatedRoute, auth: AuthService, router: Router) {
    const code = route.snapshot.queryParamMap.get('code');
    if (!code) { this.error.set('El proveedor no devolvió un código válido.'); return; }
    auth.exchangeOAuthCode(code).subscribe({
      next: async (session) => { auth.completeLogin(session, true); await router.navigate(['/']); },
      error: () => this.error.set('El código venció o ya fue utilizado. Intenta nuevamente.')
    });
  }
}
