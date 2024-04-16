import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Flight } from '../model/flight';
import { FlightService } from './flight.service';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.scss'
})
export class FlightSearchComponent {
  private flightService = inject(FlightService);

  from = 'Hamburg';
  to = 'Graz';
  flights: Flight[] = [];
  selectedFlight: Flight | undefined;
  message = '';

  search(): void {
    // Reset properties
    this.message = '';
    this.selectedFlight = undefined;

    this.flightService.find(this.from, this.to)
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

    this.flightService.save(this.selectedFlight)
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
