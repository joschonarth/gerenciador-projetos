import { CanMatchFn, RedirectCommand, Router } from '@angular/router';
import { AuthManager } from '../services/auth-manager';
import { inject } from '@angular/core';

export const authGuard: CanMatchFn = () => {
  const authManager = inject(AuthManager);
  const router = inject(Router);

  if (authManager.isAuthenticated()) {
    return true;
  }

  const urlTree = router.createUrlTree(['/login']);
  return new RedirectCommand(urlTree, { replaceUrl: true });
};
