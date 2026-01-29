import { Component, input, output } from '@angular/core';
import { ResponseTask } from '../../models/task.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-item',
  imports: [RouterLink],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {
  task = input.required<ResponseTask>();
  edit = output<ResponseTask>();
  delete = output<number>();

  onEdit() {
    this.edit.emit(this.task());
  }

  onDelete() {
    this.delete.emit(this.task().id);
  }
}
