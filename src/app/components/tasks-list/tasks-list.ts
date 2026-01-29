import { Component, inject, input, signal } from '@angular/core';
import { TasksService } from '../../services/tasks';
import { ResponseTask, Task } from '../../models/task.model';
import { error } from 'console';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskForm } from "../task-form/task-form";

@Component({
  selector: 'app-tasks-list',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDividerModule, MatProgressBarModule, MatTooltipModule, RouterLink, MatDialogModule],
  templateUrl: './tasks-list.html',
  styleUrls: ['./tasks-list.css'],
})
export class TasksList {
  id = input.required<string>();
  tasksService = inject(TasksService);
  private dialog = inject(MatDialog);
  isEditModalOpen = signal(false);
  selectedTask = signal<ResponseTask | null>(null);
  errorMessage = signal<string | null>(null);
  tasks = signal<ResponseTask[]>([]);

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasksService.getTasks(Number(this.id())).subscribe({
      next: (tasks) => {
        this.tasks.set(tasks);
        this.errorMessage.set(null);
      },
      error: (err) => {
        if(err.status === 400) {
          this.errorMessage.set('ProjectId is required and must be a number.');
        }
        else{
          this.errorMessage.set('Failed to load tasks. Please try again.');
        }
      }
    });
  }

  handleEdit(task: ResponseTask) {
    this.dialog.open(TaskForm, {
      data: { task: task, projectId: this.id() }
    });
  }

  handleDelete(taskId: number) {
      this.tasksService.deleteTask(taskId).subscribe();
  }

  openAddModal() {
    this.dialog.open(TaskForm, {
      data: { task: null, projectId: this.id() }
    });
  }

  closeModal() {
    this.isEditModalOpen.set(false);
    this.selectedTask.set(null);
  }

}
