import { ResolveFn } from '@angular/router';
import { ITask } from '../models';
import { inject } from '@angular/core';
import { ProjectApi } from '../services/project-api';

export const projectTasksResolver: ResolveFn<ITask[]> = (route) => {
  const projectApi = inject(ProjectApi);
  const projectId = route.paramMap.get('projectId')!;

  return projectApi.getTasks(projectId);
};
