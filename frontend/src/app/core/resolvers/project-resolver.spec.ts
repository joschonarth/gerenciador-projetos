import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { ProjectApi } from '../services/project-api';
import { ActivatedRouteSnapshot, convertToParamMap, RouterStateSnapshot } from '@angular/router';
import { projectResolver } from './project-resolver';
import { IProject } from '../models';

describe('Project Resolver', () => {
  let projectApiMock = {
    getById: vi.fn().mockReturnValue(of({ id: 'p1', name: 'Projeto Angular' })),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ProjectApi, useValue: projectApiMock }],
    });
  });

  it('deve extrair o projectId da URL e buscar os dados do projeto na API', () => {
    const routeMock = {
      paramMap: convertToParamMap({ projectId: 'p1' }),
    } as ActivatedRouteSnapshot;

    const routerStateMock = {} as RouterStateSnapshot;

    const result$ = TestBed.runInInjectionContext(() => {
      return projectResolver(routeMock, routerStateMock) as Observable<IProject>;
    });

    expect(projectApiMock.getById).toHaveBeenCalledWith('p1');
    result$.subscribe((project) => {
      expect(project.name).toBe('Projeto Angular');
    });
  });
});
