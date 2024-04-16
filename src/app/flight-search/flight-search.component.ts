import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Flight } from '../model/flight';
import { HttpClient } from '@angular/common/http';

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
  private http = inject(HttpClient);

  from = 'Hamburg';
  to = 'Graz';
  flights: Flight[] = [];
  selectedFlight: Flight | undefined;
  message = '';

  search(): void {
    // Reset properties
    this.message = '';
    this.selectedFlight = undefined;

    const url = 'https://demo.angulararchitects.io/api/flight';
    const params = { from: this.from, to: this.to };

    this.http.get<Flight[]>(url, { params })
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

    const url = 'https://demo.angulararchitects.io/api/flight';

    const headers = {
      Accept: 'application/json',
    };

    this.http.post<Flight>(url, this.selectedFlight, { headers }).subscribe({
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
