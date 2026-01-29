import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Storege } from '../services/storege';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storege = inject(Storege);
  const token = storege.getToken();

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }

  return next(req);
};
