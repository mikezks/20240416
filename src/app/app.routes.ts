import { Routes } from "@angular/router";
import { BOOKING_ROUTES } from "./booking/booking.routes";
import { AboutComponent } from "./core/features/about/about.component";
import { HomeComponent } from "./core/features/home/home.component";
import { NotFoundComponent } from "./shared/features/not-found/not-found.component";


export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  ...BOOKING_ROUTES,
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'error',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'error'
  }
];
