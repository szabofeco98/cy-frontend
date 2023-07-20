import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from 'src/app/services/notification.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { delay, delayWhen, tap } from 'rxjs';
import { DeleteMessageDirective } from './delete-message.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-notification-bar',
  standalone: true,
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.scss'],
  imports: [CommonModule, DeleteMessageDirective, TranslateModule],
})
export class NotificationBarComponent {
  public notification = toSignal(inject(NotificationService).notification);
}
