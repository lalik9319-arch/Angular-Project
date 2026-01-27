import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { LoginRequest } from '../../../models/auth.model';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  errorMessage = '';

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value as LoginRequest; 
      this.authService.login(credentials).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        },
        error: (err) => {
          this.errorMessage = 'Login failed. Please check your credentials.'; 
        }
      });
    }
  }

}
