import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeng/themes/lara'; // clean, flat
import Nora from '@primeng/themes/nora'; // bold borders
import Material from '@primeng/themes/material';

import { routes } from './app.routes';
import { ApiLoaderService } from './services/api-loader.service';
import { provideAppInitializer } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Material,
        options: {
          prefix: 'p',
          darkModeSelector: 'false',
        },
      },
    }),
    provideAppInitializer(() => inject(ApiLoaderService).loadGoogleMapsApi()),
  ],
};
