import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[city]',
  standalone: true,
  providers: [{
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: CityValidatorDirective
  }]
})
export class CityValidatorDirective implements Validator {
  validCities = input.required<string[]>({ alias: 'city' });

  validate(control: AbstractControl<string>): ValidationErrors | null {
    if (control?.value && !this.validCities().includes(control.value)) {
      return {
        city: {
          validCities: this.validCities(),
          actualCity: control.value
        }
      };
    }

    return null;
  }
}
