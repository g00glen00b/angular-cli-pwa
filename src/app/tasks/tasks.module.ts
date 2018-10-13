import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { PageOverviewComponent } from './page-overview/page-overview.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskListItemComponent } from './task-list/task-list-item/task-list-item.component';
import { MaterialModule } from '../material/material.module';
import { PageCreateComponent } from './page-create/page-create.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Route[] = [{
  path: 'tasks',
  component: PageOverviewComponent,
  children: [
    {path: 'create', component: PageCreateComponent, outlet: 'side'}
  ]
}];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PageOverviewComponent, TaskListComponent, TaskListItemComponent, PageCreateComponent, TaskFormComponent]
})
export class TasksModule { }
