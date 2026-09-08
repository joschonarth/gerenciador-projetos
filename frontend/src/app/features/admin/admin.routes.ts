import { Routes } from '@angular/router';
import { usersResolver } from '../../core/resolvers/users-resolver';
import { auditLogResolver } from '../../core/resolvers/audit-log-resolver';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    resolve: { users: usersResolver },
    loadComponent: () => import('./users/users').then((m) => m.Users),
    title: 'Usuários',
  },
  {
    path: 'audit-log',
    resolve: { logs: auditLogResolver },
    loadComponent: () => import('./audit-log/audit-log').then((m) => m.AuditLog),
    title: 'Audit Log',
  },
];
