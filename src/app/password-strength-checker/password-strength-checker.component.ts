import {
  Component,
  signal,
  inject,
  AfterViewInit,
  DestroyRef,
  Signal,
} from '@angular/core';
import { getPasswordStrength } from '../utils/utils';
import { map, tap } from 'rxjs/operators';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { BaseInputDirective } from '../widgets/base-input.directive';

@Component({
  selector: 'app-password-strength-checker',
  templateUrl: './password-strength-checker.component.html',
  styleUrls: ['./password-strength-checker.component.scss'],
  standalone: true,
  imports: [CommonModule, BaseInputDirective],
})
export class PasswordStrengthCheckerComponent {
  public strength = toSignal(
    inject(BaseInputDirective).control.valueChanges.pipe(
      map(getPasswordStrength)
    )
  ) as Signal<number>;
}
