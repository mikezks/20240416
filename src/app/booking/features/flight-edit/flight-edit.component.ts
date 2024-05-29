import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { initFlight } from '../../../model/flight';
import { CityValidatorDirective } from '../../../shared/validation/city-validator.directive';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from '../../data-access/flight.service';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs';

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
  private route = inject(ActivatedRoute);
  private flightService = inject(FlightService);

  flight = initFlight;
  id = 0;
  showDetails = false;

  constructor() {
    this.route.paramMap.pipe(
      map(params => ({
        id: +(params.get('id') || 0),
        showDetails: params.get('showDetails') === 'true'
      })),
      tap(({ id, showDetails }) => {
        this.id = id;
        this.showDetails = showDetails
      }),
      distinctUntilChanged((prev, curr) => prev.id === curr.id),
      switchMap(
        state => this.flightService.findById(state.id)
      )
    ).subscribe(
      flight => this.flight = flight
    );
  }

  save(): void {
    console.log(this.flight);
  }
}
