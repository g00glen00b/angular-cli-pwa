import { Task } from './task';

export function isOverdue(task: Task): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return !task.completed && task.due.getTime() < today.getTime();
}

export function getOverdueTasks(tasks: Task[]): Task[] {
  return tasks.filter(task => isOverdue(task));
}
