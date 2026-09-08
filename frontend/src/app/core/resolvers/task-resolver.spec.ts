import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { TaskApi } from '../services/task-api';
import { ActivatedRouteSnapshot, convertToParamMap, RouterStateSnapshot } from '@angular/router';
import { taskResolver } from './task-resolver';
import { ITask } from '../models';

describe('Task Resolver', () => {
  let taskApiMock = {
    getById: vi.fn().mockReturnValue(of({ id: 't1', title: 'Preparar estrutura' })),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: TaskApi, useValue: taskApiMock }],
    });
  });

  it('deve extrair o taskId da URL e buscar os dados da tarefa na API', () => {
    const routeMock = {
      paramMap: convertToParamMap({ taskId: 't1' }),
    } as ActivatedRouteSnapshot;

    const routerStateMock = {} as RouterStateSnapshot;

    const result$ = TestBed.runInInjectionContext(() => {
      return taskResolver(routeMock, routerStateMock) as Observable<ITask>;
    });

    expect(taskApiMock.getById).toHaveBeenCalledWith('t1');
    result$.subscribe((task) => {
      expect(task.id).toBe('t1');
      expect(task.title).toBe('Preparar estrutura');
    });
  });
});
