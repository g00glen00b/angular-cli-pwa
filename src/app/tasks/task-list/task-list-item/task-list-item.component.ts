import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Task } from '../../task';
import { isOverdue } from '../../task-helpers';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss']
})
export class TaskListItemComponent implements OnChanges {
  @Input()
  task: Task;
  completed: boolean;
  overdue: boolean;
  @Output()
  change: EventEmitter<Task> = new EventEmitter();

  ngOnChanges() {
    this.completed = this.task != null && this.task.completed;
    this.overdue = isOverdue(this.task);
  }

  changeCompleted() {
    this.completed = !this.completed;
    this.change.emit({...this.task, completed: this.completed});
  }
}
