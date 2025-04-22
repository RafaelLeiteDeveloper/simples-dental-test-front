import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, catchError, of } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  return authService.getUserContext().pipe(
    map(user => {
      return user.role.toLowerCase() === 'admin';
    }),
    catchError(() => of(false))
  );

};
