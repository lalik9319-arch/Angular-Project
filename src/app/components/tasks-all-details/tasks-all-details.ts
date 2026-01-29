import { Component, inject, input, signal } from '@angular/core';
import { TasksService } from '../../services/tasks';
import { ResponseTask } from '../../models/task.model';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CommentsList } from "../comments-list/comments-list";
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-tasks-all-details',
  imports: [RouterLink, DatePipe, CommentsList, MatCardModule, MatChipsModule, MatIconModule, MatProgressBarModule, MatButtonModule, MatDividerModule],
  templateUrl: './tasks-all-details.html',
  styleUrl: './tasks-all-details.css',
})
export class TasksAllDetails {
  projectId = input.required<string>({ alias: 'id' });
  taskId = input.required<string>();
  private tasksService = inject(TasksService);
  task = signal<ResponseTask | null>(null);
  isLoading = signal(true);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    const pId = Number(this.projectId());
    const tId = Number(this.taskId());

    this.isLoading.set(true);
    this.errorMessage.set(null);
    // קריאה ישירה לשרת לפי projectId
    this.tasksService.getTasks(pId).subscribe({
      next: (tasks) => {
        const found = tasks.find(t => t.id == tId);
        console.log('מערך המשימות שהגיע מהשרת:', tasks);
        console.log('ה-ID שאנחנו מחפשים (tId):', tId, 'מסוג:', typeof tId);
        if (found) {
          this.task.set(found);
        } else {
          this.errorMessage.set('Task not found in the project tasks list.');
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Error loading task details from server.');
        this.isLoading.set(false);
      }
    });
  }

}
