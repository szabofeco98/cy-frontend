import { Directive, inject } from '@angular/core';
import { delay, first, tap } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';

@Directive({
  selector: '[appDeleteMessage]',
  standalone: true,
})
export class DeleteMessageDirective {
  private disappearTime = 5000;

  private notificationService = inject(NotificationService);

  constructor() {
    this.notificationService.notification
      .pipe(
        first(),
        delay(this.disappearTime),
        tap(() => this.notificationService.setNotification(null))
      )
      .subscribe();
  }
}
