import { Pipe, PipeTransform, inject } from '@angular/core';
import { FlightService } from '../../flight-search/flight.service';
import { Observable, delay, map, of, startWith } from 'rxjs';

@Pipe({
  name: 'city',
  standalone: true
})
export class CityPipe implements PipeTransform {
  private flightService = inject(FlightService);

  transform(value: string, format = 'long'): Observable<string> {
    let short = '';
    let long = '';

    let myFromValueServer = '[not yet available]';

    const myFromValueServer$ = this.flightService.find('Ham', 'Gra').pipe(
      map(flights => '' ?? myFromValueServer)
    );

    switch (value) {
      case 'Graz':
        short = 'GRZ';
        long = 'Flughafen Graz Thalerhof';
        break;
      case 'Hamburg':
        short = 'HAM';
        long = 'Flughafen Hamburg';
        break;
      default:
        short = value;
        long = value;
    }

    if (format === 'short') {
      return myFromValueServer$.pipe(
        // delay(3_000),
        map(value => short + ' ' + value),
        startWith('🤯')
      );
    }

    return myFromValueServer$.pipe(
      // delay(3_000),
      map(value => long + ' ' + value),
      startWith('🤔')
    );
  }
}
