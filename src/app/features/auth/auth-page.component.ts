import { NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { LanguageService } from '../../core/i18n/language.service';

type AuthMode = 'login' | 'register';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [NgFor, NgIf, NgSwitch, NgSwitchCase, ReactiveFormsModule, RouterLink],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})
export class AuthPageComponent {
  readonly mode = signal<AuthMode>('login');
  readonly loading = signal(false);
  readonly showPassword = signal(false);
  readonly passwordFocused = signal(false);
  readonly message = signal('');
  readonly activeProvider = signal('');
  readonly providers = [
    { id: 'google', label: 'Google' },
    { id: 'facebook', label: 'Facebook' },
    { id: 'github', label: 'GitHub' }
  ] as const;

  readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.minLength(2)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
    confirmPassword: new FormControl('', { nonNullable: true }),
    rememberMe: new FormControl(false, { nonNullable: true })
  });

  constructor(private readonly route: ActivatedRoute, private readonly router: Router, public readonly auth: AuthService, public readonly i18n: LanguageService) {
    // El mismo componente atiende login y registro para mantener una experiencia consistente.
    this.route.data.subscribe((data) => {
      this.mode.set((data['mode'] as AuthMode) ?? 'login');
      this.message.set('');
      this.passwordFocused.set(false);
    });
  }

  isProviderEnabled(provider: string): boolean {
    return this.auth.providers$.value.find((item) => item.name === provider)?.enabled ?? false;
  }

  social(provider: string): void {
    this.activeProvider.set(provider);
    window.setTimeout(() => this.activeProvider.set(''), 420);
    if (!this.isProviderEnabled(provider)) {
      this.message.set(`${provider}: ${this.i18n.t('providerUnavailable')}`);
      return;
    }
    window.setTimeout(() => this.auth.startSocialLogin(provider), 160);
  }

  submit(): void {
    this.form.markAllAsTouched();
    const value = this.form.getRawValue();

    if (this.form.invalid) { this.message.set(this.i18n.t('reviewFields')); return; }
    if (this.mode() === 'register' && value.password !== value.confirmPassword) { this.message.set(this.i18n.t('passwordsMismatch')); return; }

    this.loading.set(true);
    this.message.set('');
    const request = this.mode() === 'login'
      ? this.auth.login(value.email, value.password, value.rememberMe)
      : this.auth.register(value.name, value.email, value.password);

    request.subscribe({
      next: async (session) => {
        this.auth.completeLogin(session, this.mode() === 'login' ? value.rememberMe : true);
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';
        await this.router.navigateByUrl(returnUrl);
      },
      error: (error: HttpErrorResponse) => {
        this.loading.set(false);
        this.message.set(error.error?.message ?? 'No fue posible conectar con el servidor.');
      }
    });
  }

  forgotPassword(): void {
    this.message.set(this.i18n.t('recoveryReady'));
  }
}
