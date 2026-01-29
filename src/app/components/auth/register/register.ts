import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../services/auth';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../../models/auth.model';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  errorMessage = signal<string | null>(null);
  isLoading = signal(false);
  onSubmit() {
    if (this.registerForm.valid && !this.isLoading()) {
      this.isLoading.set(true);
      const credentials = this.registerForm.value as RegisterRequest;
      this.authService.register(credentials).subscribe({
        next: () => {
          this.router.navigate(['/teams']);
        },
        error: (err) => {
          if (err.status === 409) {
            this.errorMessage.set('המייל הזה כבר תפוס, אולי כדאי לנסות להתחבר?');
          } else {
            this.errorMessage.set('אופס, משהו השתבש ברישום. נסי שוב מאוחר יותר.');
          }
          this.isLoading.set(false);
        },
        complete: () => {
          this.isLoading.set(false);
        }
      });
    }
  }
}
