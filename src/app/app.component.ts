import { Component, Signal, inject } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoadingService } from './services/loading.service';
import { CommonModule } from '@angular/common';
import { NotificationBarComponent } from './widgets/notification-bar/notification-bar.component';
import { filter, tap } from 'rxjs';
import { NotificationService } from './services/notification.service';
import { Router, RouterOutlet } from '@angular/router';
import { Routes } from './enums/router.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, NotificationBarComponent, RouterOutlet],
})
export class AppComponent {
  private authService = inject(AuthenticationService);

  private notificationService = inject(NotificationService);

  private router = inject(Router);

  public loading = toSignal(inject(LoadingService).loading) as Signal<boolean>;

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
            this.router.navigate([Routes.HOME]);
          }
        })
      )
      .subscribe();
  }
}
