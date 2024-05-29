import { Routes } from "@angular/router";
import { FlightSearchComponent } from "./features/flight-search/flight-search.component";
import { PassengerSearchComponent } from "./features/passenger-search/passenger-search.component";
import { FlightEditComponent } from "./features/flight-edit/flight-edit.component";
import { initFlight } from "../model/flight";


export const BOOKING_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'flight-search',
        pathMatch: 'full'
      },
      {
        path: 'flight-search',
        component: FlightSearchComponent
      },
      {
        path: 'flight-edit/:id',
        component: FlightEditComponent
      },
      {
        path: 'passenger-search',
        component: PassengerSearchComponent
      }
    ]
  }
];

export default BOOKING_ROUTES;
