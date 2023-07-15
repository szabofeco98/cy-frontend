import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationValidators } from '../validators/authentication-validators';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CheckboxComponent } from '../widgets/checkbox/checkbox.component';
import { PasswordStrengthCheckerComponent } from '../password-strength-checker/password-strength-checker.component';
import { PasswordVisibilityChangerComponent } from '../password-visibility-changer/password-visibility-changer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    CheckboxComponent,
    PasswordVisibilityChangerComponent,
    PasswordStrengthCheckerComponent,
    CommonModule,
  ],
})
export class RegisterFormComponent {
  public test = true;

  private fb = inject(FormBuilder);

  public form = this.fb.group({
    remember: null,
    password: [null, AuthenticationValidators.passwordStrengthValidator],
    email: null,
  });

  public register(): void {
    console.log(this.form.value);
  }
}
