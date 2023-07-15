import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
})
export class LoginFormComponent {
  private service = inject(AuthenticationService);
}
