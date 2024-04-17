import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Flight } from '../model/flight';
import { FlightService } from './flight.service';
import { DummyFlightService } from './dummy-flight.service';
import { CityPipe } from '../shared/pipes/city.pipe';
import { SIGNAL } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CityPipe
  ],
  providers: [
    /* {
      provide: FlightService,
      useClass: DummyFlightService
    } */
  ],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.scss'
})
export class FlightSearchComponent {
  private flightService = inject(FlightService/* , {
    optional: true
  } */);

  from = signal('Hamburg');
  to = signal('Graz');
  flights: Flight[] = [];
  selectedFlight: Flight | undefined;
  message = '';
  flightRoute = computed(
    () => 'From ' + this.from() + ' to ' + this.to() + '.'
  );

  constructor() {
    effect(
      () => console.log(this.flightRoute())
    );

    setTimeout(
      () => this.from.set('Madrid')
    , 3_000)

    console.log(this.from[SIGNAL]);
  }

  search(): void {
    // Reset properties
    this.message = '';
    this.selectedFlight = undefined;

    this.flightService?.find(this.from(), this.to())
      .subscribe(
        flights => this.flights = flights
      );
  }

  select(flight: Flight): void {
    this.selectedFlight = this.selectedFlight?.id === flight?.id
      ? undefined
      : { ...flight };
  }

  save(): void {
    if (!this.selectedFlight) return;

    this.flightService?.save(this.selectedFlight)
      .subscribe({
        next: (flight) => {
          this.selectedFlight = flight;
          this.message = 'Update successful!';
        },
        error: (errResponse) => {
          this.message = 'Error on updating the Flight';
          console.error(this.message, errResponse);
        },
      });
  }
}
