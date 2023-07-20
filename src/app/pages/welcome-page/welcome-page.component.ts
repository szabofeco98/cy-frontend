import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from 'src/app/pages/welcome-page/register-form/register-form.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/interfaces/user';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from 'src/app/pages/welcome-page/login-form/login-form.component';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [
    CommonModule,
    LoginFormComponent,
    RegisterFormComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent {
  private fb = inject(FormBuilder);

  private authService = inject(AuthenticationService);

  public form = this.fb.group({
    registerForm: RegisterFormComponent.generateForm(this.fb),
  });

  public onLogin(): void {
    this.authService.login(this.form.value.registerForm as User).subscribe();
  }
}
