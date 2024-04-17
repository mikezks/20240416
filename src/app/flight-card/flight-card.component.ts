import { Component, OnDestroy, OnInit, effect, input, model } from '@angular/core';
import { Flight } from '../model/flight';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [
    NgClass
  ],
  template: `
    <div
      [ngClass]="{ selected: selected() }"
      class="card"
    >
      <div class="card-header">
        <h2 class="card-title">
          {{ item().from }} - {{ item().to }}</h2>
      </div>

      <div class="card-body">
        <p>Flight No.: {{ item().id }}</p>
        <p>Date: {{ item().date }}</p>
        <p>Delayed: {{ item().delayed }}</p>
        <p>
          <button (click)="toggleSelection()" class="btn btn-default">
            {{ selected() ? 'Remove' : 'Select' }}
          </button>
        </p>
      </div>
    </div>
  `
})
export class FlightCardComponent implements OnInit, OnDestroy {
  item = input.required<Flight>();
  selected = model(false);

  constructor() {
    effect(
      () => console.log(this.item())
    );
  }

  ngOnInit(): void {
    console.log('Flight Card INIT', this.item().id);
  }

  toggleSelection(): void {
    this.selected.update(selected => !selected);
  }

  ngOnDestroy(): void {
    console.log('Flight Card DESTROY', this.item().id);
  }
}
