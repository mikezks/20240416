import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { FlightService } from './flight-search/flight.service';
import { DefaultFlightService } from './flight-search/default-flight.service';
import { NextFlightsModule } from './next-flights/next-flights.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    importProvidersFrom(NextFlightsModule)
  ]
};
