import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { initFlight } from '../../../model/flight';
import { validateCity, validateCityWithParams } from '../../../shared/validation/city-validator';

@Component({
  selector: 'app-flight-edit-reactive',
  standalone: true,
  imports: [
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './flight-edit-reactive.component.html',
  styleUrl: './flight-edit-reactive.component.scss'
})
export class FlightEditReactiveComponent {
  private fb = inject(FormBuilder);

  flight = initFlight;

  editForm = this.fb.nonNullable.group({
    id: [0],
    from: ['', [
      Validators.required,
      Validators.minLength(3),
      validateCity
    ]],
    to: ['', [
      Validators.required,
      Validators.minLength(3),
      validateCityWithParams([
        'Graz', 'Berlin', 'Wien'
      ])
    ]],
    date: [''],
    delayed: [false],
  });

  constructor() {
    this.editForm.patchValue(this.flight);

    this.editForm.valueChanges.subscribe(console.log);
  }

  save(): void {
    console.log({
      value: this.editForm.value,
      valid: this.editForm.valid,
      dirty: this.editForm.dirty,
      touched: this.editForm.touched,
    });
  }
}
