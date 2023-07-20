import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notification } from '../interfaces/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _notification = new BehaviorSubject<Notification | null>(null);

  public get notification() {
    return this._notification.asObservable();
  }

  public setNotification(notification: Notification | null): void {
    this._notification.next(notification);
  }
}
