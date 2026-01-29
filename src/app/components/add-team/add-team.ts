import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { Teams } from '../../services/teams';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-team',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './add-team.html',
  styleUrls: ['./add-team.css']
})
export class AddTeamComponent {
  private teamsService = inject(Teams);
  private dialogRef = inject(MatDialogRef<AddTeamComponent>);
  errorMessage = signal<string | null>(null);
  isLoading = signal(false);
  teamForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true
    })
  });

  onSubmit() {
    if (this.teamForm.invalid || this.isLoading()) return;
    this.isLoading.set(true);
    const nameValue = this.teamForm.controls.name.value;
    this.teamsService.addTeam(nameValue as string).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.errorMessage.set(null);
        this.teamForm.reset();
        this.dialogRef.close();
      },
      error: (err) => {
        this.isLoading.set(false);
        if (err.status === 400)
          this.errorMessage.set('Team name is required input. Please enter a name.');
        else
          this.errorMessage.set('Could not create team. Please try again later.');
      }
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}