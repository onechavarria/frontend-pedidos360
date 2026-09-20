import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { API_BASE_URL } from '../config/api.config';

// Adjunta JWT y cookies únicamente a las llamadas dirigidas al backend Pedidos360.
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  if (!request.url.startsWith(API_BASE_URL)) return next(request);
  const token = inject(AuthService).token;
  return next(request.clone({
    withCredentials: true,
    setHeaders: token ? { Authorization: `Bearer ${token}` } : {}
  }));
};

