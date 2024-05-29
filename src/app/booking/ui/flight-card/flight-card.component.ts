import { NgClass } from '@angular/common';
import { Component, effect, input, model } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Flight } from '../../../model/flight';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  template: `
    <!-- View of Flight Card -->
    <div
      [ngClass]="{ selected: selected() }"
      class="card"
    >
      <div class="card-header">
        <h2 class="card-title">
          {{ item().from }} - {{ item().to }}
        </h2>
        <ng-content select=".content-title" />
      </div>

      <div class="card-body">
        <p>Flight No.: {{ item().id }}</p>
        <p>Date: {{ item().date }}</p>
        <p>Delayed: {{ item().delayed }}</p>
        <ng-content />
        <p>
          <button (click)="toggleSelection()" class="btn btn-default">
            {{ selected() ? 'Remove' : 'Select' }}
          </button>
          <button
            [routerLink]="['../flight-edit', item().id, { showDetails: true }]"
            class="btn btn-default">
            Edit
          </button>
        </p>
      </div>
    </div>
  `
})
export class FlightCardComponent {
  item = input.required<Flight>();
  selected = model(false);

  constructor() {
    /* effect(
      () => console.log(this.item())
    ); */
  }

  toggleSelection(): void {
    this.selected.update(selected => !selected);
  }
}
