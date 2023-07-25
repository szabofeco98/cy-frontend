import { Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoadingService } from './services/loading.service';
import { CommonModule } from '@angular/common';
import { NotificationBarComponent } from './widgets/notification-bar/notification-bar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, NotificationBarComponent, RouterOutlet],
})
export class AppComponent {
  public loading = toSignal(inject(LoadingService).loading) as Signal<boolean>;
}
