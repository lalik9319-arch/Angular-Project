import { Component, inject, input, signal } from '@angular/core';
import { Auth } from '../../services/auth';
import { CommentsService } from '../../services/comments';
import { NewComment, Comment } from '../../models/comment.model';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-comments-list',
  imports: [FormsModule, DatePipe, MatListModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './comments-list.html',
  styleUrl: './comments-list.css',
})
export class CommentsList {
  taskId = input.required<number>();
  errorMessage = signal<string | null>(null);
  comments = signal<Comment[]>([]);
  private commentsService = inject(CommentsService);
  private authService = inject(Auth);

  newCommentContent = signal<string>('');
  isAddingComment = signal(false);
  ngOnInit() {
    this.commentsService.getComments(this.taskId()).subscribe({
      next: (comments) => this.comments.set(comments),
      error: (error) => this.errorMessage.set(error.message)
    });
  }

  addComment() {
    this.isAddingComment.set(true); 
    if (!this.newCommentContent().trim()) return;
    const newComment: NewComment = {
      body: this.newCommentContent().trim(),
      taskId: this.taskId(),
    };

    this.commentsService.addComment(newComment).subscribe({
      next: () => {
        this.isAddingComment.set(false);
        this.newCommentContent.set('');
        const c: Comment = {
          ...newComment,
          id: Date.now(),
          created_at: new Date().toISOString(),
          author_name: this.authService.currentUser()?.name || 'Unknown',
          user_id: this.authService.currentUser()?.id || 0,
          task_id: this.taskId()
        };
        this.comments.set([c, ...this.comments()]);
      },
      error: (err) => 
      {
        this.isAddingComment.set(false);
        this.errorMessage.set('Failed to add comment. Please try again later.');
      }
    });
  }
}
