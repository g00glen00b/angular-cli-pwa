import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from './task';
import { SerializableTask } from './serializable-task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  static key = 'tasks';
  subject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(TaskService.deserialize());

  constructor() { }

  private static deserialize(): Task[] {
    return JSON
      .parse(localStorage.getItem(TaskService.key) || '[]')
      .map((task: SerializableTask) => ({...task, due: new Date(task.due)}));
  }

  private static serialize(tasks: Task[]) {
    localStorage.setItem(TaskService.key, JSON.stringify(tasks));
  }

  private static id(tasks: Task[]) {
    const ids = tasks.map(task => task.id);
    return ids.length === 0 ? 1 : Math.max(...ids) + 1;
  }

  findAll(): Observable<Task[]> {
    return this.subject;
  }

  save(task: Task): void {
    const tasks: Task[] = TaskService.deserialize();
    if (task.id == null) {
      tasks.push({...task, id: TaskService.id(tasks)});
    } else {
      const index = tasks.findIndex(obj => obj.id === task.id);
      tasks[index] = task;
    }
    TaskService.serialize(tasks);
    this.subject.next(tasks);
  }
}
