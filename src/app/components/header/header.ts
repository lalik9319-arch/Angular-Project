import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  authService = inject(Auth);

  logout() {
    this.authService.logout();
  }
}
