import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';

export interface Payment { id: string; status: string; }

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private readonly http: HttpClient) {}

  // La API registra una aprobación demostrativa; no se envía el número completo de tarjeta.
  pay(amount: number, lastFour: string): Observable<Payment> {
    return this.http.post<Payment>(`${API_BASE_URL}/pagos`, { amount, currency: 'CLP', method: 'CARD', lastFour });
  }
}

