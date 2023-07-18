import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseInputDirective } from '../base-input.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BaseInputDirective,
    TranslateModule,
  ],
  providers: [{ provide: BaseInputDirective, useExisting: CheckboxComponent }],
})
export class CheckboxComponent extends BaseInputDirective {
  @Input({ required: true }) label!: string;
}
