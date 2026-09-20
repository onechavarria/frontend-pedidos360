import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { StoreComponent } from './features/store/store.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';
import { CartComponent } from './features/cart/cart.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { OrderCreatedComponent } from './features/order-created/order-created.component';
import { OrdersComponent } from './features/orders/orders.component';
import { AuthPageComponent } from './features/auth/auth-page.component';
import { AuthCallbackComponent } from './features/auth-callback/auth-callback.component';

export const routes: Routes = [
  { path: '', component: StoreComponent, title: 'Tienda | Pedidos360' },
  { path: 'game/:id', component: ProductDetailComponent, title: 'Videojuego | Pedidos360' },
  { path: 'cart', component: CartComponent, title: 'Carrito | Pedidos360' },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard], title: 'Pago | Pedidos360' },
  { path: 'orders', component: OrdersComponent, canActivate: [authGuard], title: 'Mis pedidos | Pedidos360' },
  { path: 'orders/:id', component: OrdersComponent, canActivate: [authGuard], title: 'Pedido | Pedidos360' },
  { path: 'order-created/:id', component: OrderCreatedComponent, canActivate: [authGuard], title: 'Pedido confirmado | Pedidos360' },
  { path: 'auth/login', component: AuthPageComponent, data: { mode: 'login' }, title: 'Iniciar sesión | Pedidos360' },
  { path: 'auth/register', component: AuthPageComponent, data: { mode: 'register' }, title: 'Crear cuenta | Pedidos360' },
  { path: 'auth/callback', component: AuthCallbackComponent, title: 'Validando acceso | Pedidos360' },
  { path: '**', redirectTo: '' }
];

