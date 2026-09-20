import 'zone.js';
import { registerLocaleData } from '@angular/common';
import localeEsCL from '@angular/common/locales/es-CL';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

// Activa precios y fechas con formato chileno en toda la aplicación.
registerLocaleData(localeEsCL);
bootstrapApplication(App, appConfig).catch((error) => console.error(error));
