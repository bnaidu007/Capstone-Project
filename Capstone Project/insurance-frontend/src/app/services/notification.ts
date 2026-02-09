import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type NotificationType = 'success' | 'error' | 'info';

export interface AppNotification {
  type: NotificationType;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject =
    new BehaviorSubject<AppNotification | null>(null);

  notification$ = this.notificationSubject.asObservable();

  success(text: string) {
    this.notificationSubject.next({ type: 'success', text });
  }

  error(text: string) {
    this.notificationSubject.next({ type: 'error', text });
  }

  info(text: string) {
    this.notificationSubject.next({ type: 'info', text });
  }

  clear() {
    this.notificationSubject.next(null);
  }
}
