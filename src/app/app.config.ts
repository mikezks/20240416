import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { NextFlightsModule } from './next-flights/next-flights.module';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';
import { APP_ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules)
    ),
    provideHttpClient(),
    importProvidersFrom(NextFlightsModule),
    importProvidersFrom(MatDialogModule)
  ]
};
