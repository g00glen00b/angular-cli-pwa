import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskNotificationService {

  constructor() { }

  notify(tasks: Task[]) {
    Notification.requestPermission(perm => {
      if (perm === 'granted') {
        window.navigator.serviceWorker.ready.then(reg => {
          reg.showNotification(`You have ${tasks.length} tasks that are overdue`, {
            icon: './assets/icons/icon-72x72.png'
          });
        });
      }
    });
  }
}
