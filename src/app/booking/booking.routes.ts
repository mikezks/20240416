import { Routes } from "@angular/router";
import { FlightSearchComponent } from "./features/flight-search/flight-search.component";
import { PassengerSearchComponent } from "./features/passenger-search/passenger-search.component";


export const BOOKING_ROUTES: Routes = [
  {
    path: 'flight-search',
    component: FlightSearchComponent
  },
  {
    path: 'passenger-search',
    component: PassengerSearchComponent
  }
];
