import { Routes } from '@angular/router';

export const PROJECT_ROUTES: Routes = [
  { path: '', redirectTo: 'board', pathMatch: 'full' },
  {
    path: 'board',
    loadComponent: () => import('./board/board').then((m) => m.Board),
    title: 'Board',
  },
  {
    path: 'backlog',
    loadComponent: () => import('./backlog/backlog').then((m) => m.Backlog),
    title: 'Backlog',
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./project-settings/project-settings').then((m) => m.ProjectSettings),
    title: 'Configurações do Projeto',
  },
  {
    path: 'task/:taskId',
    outlet: 'detail',
    loadComponent: () => import('./task-detail/task-detail').then((m) => m.TaskDetail),
    title: 'Detalhes da Task',
  },
];
