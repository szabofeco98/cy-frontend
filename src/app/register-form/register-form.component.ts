import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationValidators } from '../validators/authentication-validators';
import { CheckboxComponent } from '../widgets/checkbox/checkbox.component';
import { PasswordStrengthCheckerComponent } from '../password-strength-checker/password-strength-checker.component';
import { PasswordVisibilityChangerComponent } from '../password-visibility-changer/password-visibility-changer.component';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../widgets/input/input.component';
import { SuffixDirective } from '../widgets/input/suffix.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CheckboxComponent,
    PasswordVisibilityChangerComponent,
    PasswordStrengthCheckerComponent,
    CommonModule,
    InputComponent,
    SuffixDirective,
    TranslateModule,
  ],
})
export class RegisterFormComponent {
  public form = inject(FormBuilder).group({
    remember: null,
    password: [null, AuthenticationValidators.passwordStrengthValidator],
    email: null,
  });

  public register(): void {
    console.log(this.form.value);
  }
}
