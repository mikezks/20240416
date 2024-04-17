import { Component, effect, input, model, output, signal } from '@angular/core';
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
      [ngClass]="{ selected: selectedInternalState() }"
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
            {{ selectedInternalState() ? 'Remove' : 'Select' }}
          </button>
        </p>
      </div>
    </div>
  `
})
export class FlightCardComponent {
  item = input.required<Flight>();
  selected = input(false);
  selectedChange = output<boolean>();
  protected selectedInternalState = signal(false);

  constructor() {
    effect(
      () => this.selectedInternalState.set(this.selected()),
      { allowSignalWrites: true }
    );
  }

  toggleSelection(): void {
    this.selectedInternalState.update(selected => !selected);
    this.selectedChange.emit(this.selectedInternalState());
  }
}
