import {
  Component,
  signal,
  inject,
  AfterViewInit,
  Signal,
  DestroyRef,
} from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { getPasswordStrength } from '../utils/utils';
import { tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-password-strength-checker',
  templateUrl: './password-strength-checker.component.html',
  styleUrls: ['./password-strength-checker.component.scss'],
})
export class PasswordStrengthCheckerComponent implements AfterViewInit {
  public strength = signal(1);

  private formField = inject(MatFormField);

  private destroyRef = inject(DestroyRef);

  public ngAfterViewInit(): void {
    const valueChanges = this.formField._control.ngControl?.valueChanges;
    if (valueChanges) {
      valueChanges
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          tap((val) => {
            this.strength.set(getPasswordStrength(val));
          })
        )
        .subscribe();
    }
  }
}
