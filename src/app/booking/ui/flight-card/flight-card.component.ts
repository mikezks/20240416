import { Component, OnDestroy, OnInit, effect, inject, input, model } from '@angular/core';
import { NgClass } from '@angular/common';
import { Flight } from '../../../model/flight';
import { MatDialog } from '@angular/material/dialog';
import { FlightEditReactiveComponent } from '../../features/flight-edit-reactive/flight-edit-reactive.component';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [NgClass],
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
          <button (click)="edit()" class="btn btn-default">
            Edit
          </button>
        </p>
      </div>
    </div>
  `
})
export class FlightCardComponent {
  private dialog = inject(MatDialog);

  item = input.required<Flight>();
  selected = model(false);

  constructor() {
    effect(
      () => console.log(this.item())
    );
  }

  toggleSelection(): void {
    this.selected.update(selected => !selected);
  }

  edit(): void {
    this.dialog.open(FlightEditReactiveComponent, {
      data: { flight: { ...this.item() }},
      minWidth: '70%',
      panelClass: 'form-dialog'
    });
  }
}
