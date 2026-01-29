import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Teams } from '../../services/teams';
import { TeamMember } from '../../models/team.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-member',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  styleUrls: ['./add-member.css'],
  templateUrl: './add-member.html',
})
export class AddMemberComponent {
  private teamsService = inject(Teams);
  private dialogRef = inject(MatDialogRef<AddMemberComponent>);
  private data = inject(MAT_DIALOG_DATA);
  teamId = signal(this.data?.teamId);
  errorMessage = signal<string | null>(null);
  isLoading = signal(false);

  memberForm = new FormGroup({
    userId: new FormControl<number | null>(null, [Validators.required]),
    role: new FormControl<string>('member', [Validators.required])
  });

  onSubmit() {
    if (this.memberForm.invalid || this.isLoading()) return;
    this.isLoading.set(true);
    this.teamsService.addMemberToTeam(this.memberForm.value as TeamMember, this.teamId()).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.errorMessage.set(null);
        this.memberForm.reset();
        this.dialogRef.close();
      },
      error: (err) => {
        this.isLoading.set(false);
        if (err.status === 403)
          this.errorMessage.set('You do not have permission to add members to this team.');
        else
          this.errorMessage.set('Failed to add member. Please try again later.');
      }
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}