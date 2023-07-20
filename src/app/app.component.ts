import { Component, Signal, inject } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoadingService } from './services/loading.service';
import { CommonModule } from '@angular/common';
import { User } from './interfaces/user';
import { NotificationBarComponent } from './widgets/notification-bar/notification-bar.component';
import { filter, tap } from 'rxjs';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    LoginFormComponent,
    RegisterFormComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NotificationBarComponent,
  ],
})
export class AppComponent {
  private fb = inject(FormBuilder);

  private authService = inject(AuthenticationService);

  private notificationService = inject(NotificationService);

  public loading = toSignal(inject(LoadingService).loading) as Signal<boolean>;

  public form = this.fb.group({
    registerForm: RegisterFormComponent.generateForm(this.fb),
  });

  public onLogin(): void {
    this.authService.login(this.form.value.registerForm as User).subscribe();
  }

  constructor() {
    this.authService.loggedInUser
      .pipe(
        takeUntilDestroyed(),
        filter((value) => !!value),
        tap((value) => {
          if (value?.error) {
            this.notificationService.setNotification({
              message: value.error,
              type: 'error',
            });
          } else {
            this.notificationService.setNotification({
              message: 'COMMON.SUCCESSFUL_LOGIN',
              type: 'success',
            });
          }
        })
      )
      .subscribe();
  }
}
