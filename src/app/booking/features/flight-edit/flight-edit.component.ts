import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Flight } from '../../../model/flight';
import { JsonPipe } from '@angular/common';
import { CityValidatorDirective } from '../../../shared/validation/city-validator.directive';

@Component({
  selector: 'app-flight-edit',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    JsonPipe,
    CityValidatorDirective
  ],
  templateUrl: './flight-edit.component.html',
  styleUrl: './flight-edit.component.scss'
})
export class FlightEditComponent {
  dialogRef = inject(MatDialogRef);
  data = inject<{ flight: Flight }>(MAT_DIALOG_DATA);
  flight = this.data.flight;

  save(): void {
    console.log(this.flight);
  }

  close(): void {
    this.dialogRef.close();
  }
}
