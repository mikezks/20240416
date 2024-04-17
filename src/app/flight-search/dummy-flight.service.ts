import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Flight, initFlight } from '../model/flight';
import { FlightService } from './flight.service';

@Injectable({
  providedIn: 'root'
})
export class DummyFlightService implements FlightService {
  find(): Observable<Flight[]> {
    return of([{
      ...initFlight,
      from: 'LA',
      to: 'San Francisco'
    }]);
  }
  save(): Observable<Flight> {
    return of(initFlight);
  }
}
