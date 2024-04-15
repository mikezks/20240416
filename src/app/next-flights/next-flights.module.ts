import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NextFlightsComponent } from './features/next-flights/next-flights.component';
import { NextFlightsService } from './data-access/next-flights.service';
import { CheckinComponent } from './ui/checkin/checkin.component';


@NgModule({
  declarations: [
    NextFlightsComponent
  ],
  imports: [
    CommonModule,
    CheckinComponent
  ],
  providers: [
    NextFlightsService
  ],
  exports: [
    NextFlightsComponent
  ]
})
export class NextFlightsModule { }
