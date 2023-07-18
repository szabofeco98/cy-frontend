import { Directive, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { tap } from 'rxjs';

@Directive({
  selector: '[appBaseInput]',
  standalone: true,
})
export class BaseInputDirective implements ControlValueAccessor {
  public control = new FormControl();

  public change: ((obj: any) => void) | null = null;

  public touch: (() => void) | null = null;

  private ngControl = inject(NgControl);

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    this.control.valueChanges
      .pipe(
        takeUntilDestroyed(),
        tap((value) => this.change?.(value))
      )
      .subscribe();
  }

  public writeValue(obj: any): void {
    this.control.setValue(obj, { emitEvent: false });
  }

  public registerOnChange(fn: (obj: boolean) => void): void {
    this.change = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touch = fn;
  }
}
