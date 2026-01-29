import { Component, inject, input, computed, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../services/projects';
import { Project } from '../../models/project.model';
import { AddProject } from "../add-project/add-project";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatProgressBarModule, MatChipsModule, MatTooltipModule, MatDialogModule],
  templateUrl: './projects-list.html',
  styleUrl: './projects-list.css',
})
export class ProjectsList implements OnInit {
  protected projectsService = inject(ProjectsService);
  private dialog = inject(MatDialog);
  teamId = input<string | undefined>();
  errorMessage = signal<string | null>(null);
  protected isAddModalOpen = signal<boolean>(false);

  filteredProjects = computed(() => {
    const allProjects = this.projectsService.projectsList();
    const tid = this.teamId();
    return tid ? allProjects.filter(p => p.team_id === Number(tid)) : allProjects;
  });


  pageTitle = computed(() => {
    return this.teamId() ? `Team Projects` : 'All Projects';
  });
  openAddProject(): void {
    this.dialog.open(AddProject, {
      data: { teamId: this.teamId() }
    });
  }
  closeAddProject(): void {
    this.isAddModalOpen.set(false);
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.projectsService.getProjects().subscribe({
      next: () => {
        this.errorMessage.set(null);
      },
      error: () => {
        this.errorMessage.set('Failed to load projects. Please try again.');
      }
    });
  }
}