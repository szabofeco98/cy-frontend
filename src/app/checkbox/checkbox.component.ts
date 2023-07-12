import { Component, Input, inject } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input({ required: true }) label!: string;

  public control = new FormControl();

  public change: ((obj: boolean) => void) | null = null;

  public touch: (() => void) | null = null;

  private ngControl = inject(NgControl);

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    this.control.valueChanges
      .pipe(
        takeUntilDestroyed(),
        tap((value: boolean) => this.change?.(value))
      )
      .subscribe();
  }

  public writeValue(obj: boolean): void {
    this.control.setValue(obj, { emitEvent: false });
  }

  public registerOnChange(fn: (obj: boolean) => void): void {
    this.change = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touch = fn;
  }
}
