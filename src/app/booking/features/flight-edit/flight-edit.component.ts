import { JsonPipe } from '@angular/common';
import { Component, booleanAttribute, effect, inject, input, numberAttribute } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';
import { Flight, initFlight } from '../../../model/flight';
import { CityValidatorDirective } from '../../../shared/validation/city-validator.directive';
import { FlightService } from '../../data-access/flight.service';

@Component({
  selector: 'app-flight-edit',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    CityValidatorDirective
  ],
  templateUrl: './flight-edit.component.html',
  styleUrl: './flight-edit.component.scss'
})
export class FlightEditComponent {
  private flightService = inject(FlightService);

  id = input(0, {
    transform: numberAttribute
  });
  showDetails = input(false, {
    transform: booleanAttribute
  });
  flightSignal = toSignal(
    toObservable(this.id).pipe(
      switchMap(id => this.flightService.findById(id))
    ), {
      initialValue: initFlight
    }
  );
  flight: Flight = this.flightSignal();

  constructor() {
    effect(
      () => this.flight = this.flightSignal()
    );
  }

  save(): void {
    console.log(this.flight);
  }
}
