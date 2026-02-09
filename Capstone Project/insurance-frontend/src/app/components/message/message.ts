import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NotificationService,
  AppNotification
} from '../../services/notification';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.html',
  styleUrl: './message.css'
})
export class MessageComponent implements OnInit {

  notification: AppNotification | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notification$
      .subscribe(n => this.notification = n);
  }

  close() {
    this.notificationService.clear();
  }
}
