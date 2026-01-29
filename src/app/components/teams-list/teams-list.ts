import { Component, inject, OnInit, signal } from '@angular/core';
import { Teams } from '../../services/teams';
import { Team } from '../../models/team.model';
import { RouterLink } from '@angular/router';
import { AddMemberComponent } from "../add-member/add-member";
import { AddTeamComponent } from '../add-team/add-team';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-teams-list',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatProgressBarModule, MatTooltipModule, MatDialogModule],
  templateUrl: './teams-list.html',
  styleUrl: './teams-list.css',
})
export class TeamsList implements OnInit {
  teamsService = inject(Teams);
  dialog = inject(MatDialog);
  errorMessage = signal<string | null>(null);
  teams = signal<Team[]>([]);
  protected isModalOpen = signal<boolean>(false);
  protected selectedTeamId = signal<number | null>(null);
  protected isAddTeamModalOpen = signal<boolean>(false);
  openAddMember(id: number): void {
    this.dialog.open(AddMemberComponent, {
      data: { teamId: id }
    });
  }
  openAddTeam(): void {
    this.dialog.open(AddTeamComponent);
  }
  closeAddTeam(): void {
    this.isAddTeamModalOpen.set(false);
  }
  ngOnInit() {
    this.teamsService.getTeams().subscribe({
    next: () => {
        this.errorMessage.set(null); 
      },
      error: (err) => {
        this.errorMessage.set('error loading teams. Please try again later.');
      }
    });
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.selectedTeamId.set(null); 
  }  
}
