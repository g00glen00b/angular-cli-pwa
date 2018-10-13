import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-page-create',
  templateUrl: './page-create.component.html'
})
export class PageCreateComponent {
  newTask: Task = {description: '', due: new Date(), completed: false};

  constructor(private router: Router, private service: TaskService) { }

  save(task: Task) {
    this.service.save(task);
    this.router.navigateByUrl('/tasks');
  }

  cancel() {
    this.router.navigateByUrl('/tasks');
  }
}
