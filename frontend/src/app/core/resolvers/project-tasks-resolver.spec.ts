import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { ProjectApi } from '../services/project-api';
import { ActivatedRouteSnapshot, convertToParamMap, RouterStateSnapshot } from '@angular/router';
import { projectTasksResolver } from './project-tasks-resolver';
import { ITask } from '../models';

describe('Project Tasks Resolver', () => {
  let projectApiMock = {
    getTasks: vi.fn().mockReturnValue(of([{ id: 't1', title: 'Criar layout do projeto' }])),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ProjectApi, useValue: projectApiMock }],
    });
  });

  it('deve extrair o projectId da URL e buscar as tarefas do projeto na API', () => {
    const routeMock = {
      paramMap: convertToParamMap({ projectId: 'p1' }),
    } as ActivatedRouteSnapshot;

    const routerStateMock = {} as RouterStateSnapshot;

    const result$ = TestBed.runInInjectionContext(() => {
      return projectTasksResolver(routeMock, routerStateMock) as Observable<ITask[]>;
    });

    expect(projectApiMock.getTasks).toHaveBeenCalledWith('p1');
    result$.subscribe((tasks) => {
      expect(tasks[0].id).toBe('t1');
      expect(tasks[0].title).toBe('Criar layout do projeto');
    });
  });
});
