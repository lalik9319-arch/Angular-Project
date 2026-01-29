import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { ProjectsService } from '../../services/projects';
import { NewProject } from '../../models/project.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './add-project.html',
  styleUrls: ['./add-project.css']
})
export class AddProject{
  private projectsService = inject(ProjectsService);
  private dialogRef = inject(MatDialogRef<AddProject>);
  private data = inject(MAT_DIALOG_DATA);
  teamId = signal(this.data?.teamId);
  errorMessage = signal<string | null>(null);
  isLoading = signal(false);

  projectForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  onSubmit() {
    if (this.projectForm.invalid || this.isLoading()) return;
    this.isLoading.set(true);
    const { name, description } = this.projectForm.getRawValue();
    const newProject = {
      teamId: Number(this.teamId()),
      name: name,
      description: description
    };
    this.projectsService.addProject(newProject).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.errorMessage.set(null);
        this.projectForm.reset();
        this.dialogRef.close();
      },
      error: (err) => {
        this.isLoading.set(false);
        if (err.status === 400)
          this.errorMessage.set('Project name and description are required. Please fill them out.');
        else if (err.status === 403)
          this.errorMessage.set('You do not have permission to add projects to this team.');
        else
          this.errorMessage.set('Could not create project. Please try again later.');
      }
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}