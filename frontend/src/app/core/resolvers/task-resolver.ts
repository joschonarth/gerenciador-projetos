import { ResolveFn } from '@angular/router';
import { ITask } from '../models';
import { inject } from '@angular/core';
import { TaskApi } from '../services/task-api';

export const taskResolver: ResolveFn<ITask> = (route) => {
  const taskApi = inject(TaskApi);
  const taskId = route.paramMap.get('taskId')!;

  return taskApi.getById(taskId);
};
