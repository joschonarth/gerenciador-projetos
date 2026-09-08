import { Routes } from '@angular/router';
import { projectResolver } from '../../core/resolvers/project-resolver';
import { projectTasksResolver } from '../../core/resolvers/project-tasks-resolver';
import { taskResolver } from '../../core/resolvers/task-resolver';
import { unsavedChangesGuard } from '../../core/guards/unsaved-changes-guard';

export const PROJECT_ROUTES: Routes = [
  {
    path: '',
    resolve: { project: projectResolver },
    children: [
      { path: '', redirectTo: 'board', pathMatch: 'full' },
      {
        path: 'board',
        resolve: { tasks: projectTasksResolver },
        loadComponent: () => import('./board/board').then((m) => m.Board),
        title: 'Board',
      },
      {
        path: 'backlog',
        resolve: { tasks: projectTasksResolver },
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
        resolve: { task: taskResolver },
        canDeactivate: [unsavedChangesGuard],
        loadComponent: () => import('./task-detail/task-detail').then((m) => m.TaskDetail),
        title: 'Detalhes da Task',
      },
    ],
  },
];
