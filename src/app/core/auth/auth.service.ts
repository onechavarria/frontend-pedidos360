import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';
import { AuthSession, IdentityProvider, User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly localKey = 'pedidos360_access_token';
  private readonly sessionKey = 'pedidos360_session_token';
  private readonly userSubject = new BehaviorSubject<User | null>(null);

  readonly user$ = this.userSubject.asObservable();
  readonly providers$ = new BehaviorSubject<IdentityProvider[]>([]);
  private initialized = false;

  constructor(private readonly http: HttpClient) {}

  // Recupera la sesión guardada o solicita un access token nuevo mediante la cookie segura.
  async initialize(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;
    try {
      if (this.token) {
        const response = await firstValueFrom(this.http.get<{ user: User }>(`${API_BASE_URL}/auth/me`));
        this.userSubject.next(response.user);
      } else {
        const session = await firstValueFrom(this.http.post<AuthSession>(`${API_BASE_URL}/auth/refresh`, {}));
        this.saveSession(session, false);
      }
    } catch {
      this.clearSession();
    }
    this.loadProviders();
  }

  get user(): User | null { return this.userSubject.value; }
  get isLoggedIn(): boolean { return Boolean(this.user); }
  get displayName(): string { return this.user?.name ?? 'Usuario'; }
  get email(): string { return this.user?.email ?? ''; }
  get token(): string | null { return localStorage.getItem(this.localKey) ?? sessionStorage.getItem(this.sessionKey); }

  login(email: string, password: string, rememberMe: boolean) {
    return this.http.post<AuthSession>(`${API_BASE_URL}/auth/login`, { email, password, rememberMe });
  }

  register(name: string, email: string, password: string) {
    return this.http.post<AuthSession>(`${API_BASE_URL}/auth/register`, { name, email, password });
  }

  completeLogin(session: AuthSession, rememberMe = false): void {
    this.saveSession(session, rememberMe);
  }

  startSocialLogin(provider: string): void {
    window.location.assign(`${API_BASE_URL}/auth/oauth/${provider}`);
  }

  exchangeOAuthCode(code: string) {
    return this.http.post<AuthSession>(`${API_BASE_URL}/auth/exchange`, { code });
  }

  async logout(): Promise<void> {
    try { await firstValueFrom(this.http.post<void>(`${API_BASE_URL}/auth/logout`, {})); }
    finally { this.clearSession(); }
  }

  private loadProviders(): void {
    this.http.get<{ providers: IdentityProvider[] }>(`${API_BASE_URL}/auth/providers`).subscribe({
      next: ({ providers }) => this.providers$.next(providers),
      error: () => this.providers$.next([])
    });
  }

  // "Recordarme" decide si el token sobrevive o no al cierre del navegador.
  private saveSession(session: AuthSession, rememberMe: boolean): void {
    localStorage.removeItem(this.localKey);
    sessionStorage.removeItem(this.sessionKey);
    (rememberMe ? localStorage : sessionStorage).setItem(rememberMe ? this.localKey : this.sessionKey, session.accessToken);
    this.userSubject.next(session.user);
  }

  private clearSession(): void {
    localStorage.removeItem(this.localKey);
    sessionStorage.removeItem(this.sessionKey);
    this.userSubject.next(null);
  }
}

