import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { Constants } from '../utils/Constants';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  const token = authService.getToken();

  try {
    const response = await fetch(`${Constants.apiUrl.BASE_URL}/${Constants.apiUrl.auth.AUTH_BASE}/${Constants.apiUrl.auth.AUTH_GET_USER}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      authService.logout();
      return false;
    }
    return true;
  } catch (error) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    authService.logout();
    return false;
  }
};
