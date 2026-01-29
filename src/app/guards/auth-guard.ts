import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  console.log('Guard checking status. LoggedIn:', auth.isLoggedIn());
  if (auth.isLoggedIn()) {
    return true;
  } else {
     router.navigate(['/login']);
      return false;
  }
}