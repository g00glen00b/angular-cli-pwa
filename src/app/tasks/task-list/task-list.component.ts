import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnChanges {
  @Input()
  tasks: Task[];
  @Output()
  change: EventEmitter<Task> = new EventEmitter();

  ngOnChanges() {
    this.tasks.sort((task1, task2) => task1.due.getTime() - task2.due.getTime());
  }

}
