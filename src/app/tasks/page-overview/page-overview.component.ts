import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { Subject } from 'rxjs';
import { first, map, share, takeUntil } from 'rxjs/operators';
import { getOverdueTasks } from '../task-helpers';
import { TaskNotificationService } from '../task-notification.service';

@Component({
  selector: 'app-page-overview',
  templateUrl: './page-overview.component.html',
  styleUrls: ['./page-overview.component.scss']
})
export class PageOverviewComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  openSidebar = false;
  private stop: Subject<void> = new Subject();

  constructor(private service: TaskService, private notificationService: TaskNotificationService) { }

  ngOnInit() {
    const findAll = this.service.findAll().pipe(share());
    findAll.pipe(takeUntil(this.stop)).subscribe(tasks => this.tasks = tasks);
    findAll.pipe(first(), map(tasks => getOverdueTasks(tasks))).subscribe(tasks => this.notificationService.notify(tasks));
  }

  ngOnDestroy() {
    this.stop.next();
    this.stop.complete();
  }

  updateTask(task: Task) {
    this.service.save(task);
  }


}
