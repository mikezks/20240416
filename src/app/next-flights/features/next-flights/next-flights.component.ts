import { Component, inject } from '@angular/core';
import { NextFlightsService } from '../../data-access/next-flights.service';

@Component({
  selector: 'app-next-flights',
  templateUrl: './next-flights.component.html',
  styleUrl: './next-flights.component.scss'
})
export class NextFlightsComponent {
  // private nextFlightsService = inject(NextFlightsService);
  flights$ = this.nextFlightsService.load();

  constructor(private nextFlightsService: NextFlightsService) {}
}
