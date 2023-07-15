import { AbstractControl } from '@angular/forms';
import { getPasswordStrength } from '../utils/utils';

export class AuthenticationValidators {
  public static passwordStrengthValidator(
    control: AbstractControl
  ): { passwordStrengthError: boolean } | null {
    return getPasswordStrength(control.value) > 2
      ? null
      : { passwordStrengthError: true };
  }
}
