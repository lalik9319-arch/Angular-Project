import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  authService = inject(Auth); // השירות שבודק אם המשתמש מחובר

  logout() {
    this.authService.logout();
  }
}
