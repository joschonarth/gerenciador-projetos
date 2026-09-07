import { Routes } from '@angular/router';

export const SETTINGS_ROUTES: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile').then((m) => m.Profile),
    title: 'Perfil',
  },
  {
    path: 'billing',
    loadComponent: () => import('./billing/billing').then((m) => m.Billing),
    title: 'Faturamento',
  },
];
