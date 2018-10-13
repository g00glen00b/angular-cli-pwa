import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  @Input()
  task: Task;
  @Input()
  saveLabel: string;
  form: FormGroup;
  @Output()
  save: EventEmitter<Task> = new EventEmitter();
  @Output()
  cancel: EventEmitter<void> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      description: [this.task.description || '', Validators.required],
      due: [this.task.due || new Date(), Validators.required]
    });
  }

  onSave() {
    const description: string = this.form.get('description').value;
    const due: Date = this.form.get('due').value;
    this.save.emit({...this.task, description, due});
  }

  onCancel() {
    this.cancel.emit();
  }
}
