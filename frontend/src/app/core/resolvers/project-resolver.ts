import { ResolveFn } from '@angular/router';
import { IProject } from '../models';
import { inject } from '@angular/core';
import { ProjectApi } from '../services/project-api';

export const projectResolver: ResolveFn<IProject> = (route) => {
  const projectApi = inject(ProjectApi);
  const projectId = route.paramMap.get('projectId')!;

  return projectApi.getById(projectId);
};
