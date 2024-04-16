import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../model/flight';
import { FlightService } from './flight.service';

@Injectable({
  providedIn: 'root'
})
export class DefaultFlightService implements FlightService {
  private http = inject(HttpClient);

  find(from: string, to: string): Observable<Flight[]> {
    const url = 'https://demo.angulararchitects.io/api/flight';
    const params = { from, to };

    return this.http.get<Flight[]>(url, { params });
  }

  save(flight: Flight): Observable<Flight> {
    const url = 'https://demo.angulararchitects.io/api/flight';

    const headers = {
      Accept: 'application/json',
    };

    return this.http.post<Flight>(url, flight, { headers });
  }
}
