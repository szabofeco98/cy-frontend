import {
  Component,
  ContentChild,
  Input,
  WritableSignal,
  signal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseInputDirective } from '../base-input.directive';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SuffixDirective } from './suffix.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BaseInputDirective,
    CommonModule,
    SuffixDirective,
    TranslateModule,
  ],
  providers: [{ provide: BaseInputDirective, useExisting: InputComponent }],
})
export class InputComponent extends BaseInputDirective {
  @Input({ required: true }) label!: string;

  @ContentChild(SuffixDirective, { static: true }) appSuffix?: SuffixDirective;

  public type = 'text';

  public inputIsActive = signal(false);

  constructor() {
    super();
    this.inputIsActive = toSignal(
      this.control.valueChanges.pipe(map((value) => !!value))
    ) as WritableSignal<boolean>;
  }
}
