import { Component, inject, input, output, signal } from '@angular/core';
import { TasksService } from '../../services/tasks';
import { EditTask, ResponseTask, Task, TaskPriority, TaskStatus } from '../../models/task.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { title } from 'process';
import { Auth } from '../../services/auth';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatIconModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  private tasksService = inject(TasksService);
  private authService = inject(Auth);
  private dialogRef = inject(MatDialogRef<TaskForm>);
  private data = inject(MAT_DIALOG_DATA);
  isLoading = signal(false);
  taskToEdit = signal<ResponseTask | null>(this.data?.task || null);
  projectId = signal(this.data?.projectId);
  errorMessage = signal<string | null>(null);
  taskForm = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    status: new FormControl('Todo', { nonNullable: true }),
    priority: new FormControl('Medium', { nonNullable: true }),

  });

  ngOnInit() {
    const task = this.taskToEdit();
    if (task) {
      this.taskForm.patchValue({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status
      });
    }
  }

  onSubmit() {
    if (this.taskForm.invalid || this.isLoading()) return;
    this.isLoading.set(true);
    const formData: Partial<EditTask> = {
      title: this.taskForm.getRawValue().title,
      description: this.taskForm.getRawValue().description,
      status: this.taskForm.getRawValue().status as TaskStatus,
      priority: this.taskForm.getRawValue().priority as TaskPriority
    };

    const task = this.taskToEdit();

    if (task) {
      this.tasksService.updateTask(task.id, formData).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.errorMessage.set(null);
          this.dialogRef.close();
        },
        error: (err) => {
          this.isLoading.set(false);
          if (err.status === 400) {
            this.errorMessage.set('Invalid task data. Please check your input.');
          } else {
            this.errorMessage.set('Failed to update task. Please try again later.');
          }
        }
      });
    } else {
      const newTask: Task = {
        projectId: Number(this.projectId()),
        title: formData.title || '',
        description: formData.description || '',
        status: formData.status as TaskStatus,
        priority: formData.priority as TaskPriority,
        assigneeId: this.authService.currentUser()?.id || 0,
        dueDate: new Date().toISOString(),
        orderIndex: 0
      };
      this.tasksService.createTask(newTask).subscribe(
        {
          next: () => {
            this.isLoading.set(false);
            this.errorMessage.set(null);
            this.dialogRef.close();
          },
          error: (err) => {
            this.isLoading.set(false);
            if (err.status === 400) {
              this.errorMessage.set('Invalid task data. Please check your input.');
            } else {
              this.errorMessage.set('Failed to create task. Please try again later.');
            }
          }
        });
    }
  }
  onCancel() {
    if (!this.isLoading()) {
      this.dialogRef.close();
    }
  }
}
