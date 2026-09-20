import { describe, expect, it } from 'vitest';
import { App } from './app';

// Prueba mínima para confirmar que el componente raíz puede construirse.
describe('App', () => {
  it('se crea correctamente', () => {
    expect(new App()).toBeTruthy();
  });
});
