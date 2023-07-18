import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication-service.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [TranslateModule],
})
export class LoginFormComponent {
  private service = inject(AuthenticationService);
}
