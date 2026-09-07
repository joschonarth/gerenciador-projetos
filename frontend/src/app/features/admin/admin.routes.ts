import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadComponent: () => import('./users/users').then((m) => m.Users),
    title: 'Usuários',
  },
  {
    path: 'audit-log',
    loadComponent: () => import('./audit-log/audit-log').then((m) => m.AuditLog),
    title: 'Audit Log',
  },
];
