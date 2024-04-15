import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../../model/flight';
import { DummyFlightService } from './dummy-flight.service';
import { DefaultFlightService } from './default-flight.service';

let config: { flightService: 'dummy' | 'default' } = {
  flightService: 'default'
};

@Injectable({
  providedIn: 'root',
  useFactory: () => {
    if (config.flightService === 'dummy') {
      return new DummyFlightService();
    }

    return new DefaultFlightService();
  }
})
export abstract class FlightService {
  abstract find(from: string, to: string): Observable<Flight[]>;
  abstract save(flight: Flight): Observable<Flight>;
}
