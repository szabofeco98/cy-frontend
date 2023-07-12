import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  public test = true;

  private fb = inject(FormBuilder);

  public form = this.fb.group({
    remember: null,
    password: null,
    email: null,
  });

  public register(): void {
    console.log(this.form.value);
  }
}
