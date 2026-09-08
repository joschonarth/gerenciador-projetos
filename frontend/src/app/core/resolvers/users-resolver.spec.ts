import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { AdminApi } from '../services/admin-api';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { usersResolver } from './users-resolver';
import { IUser } from '../models';

describe('Users Resolver', () => {
  let adminApiMock = {
    getUsers: vi.fn().mockReturnValue(of([{ id: 'u1', name: 'João' }])),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AdminApi, useValue: adminApiMock }],
    });
  });

  it('deve buscar os usuários na API', () => {
    const routeMock = {} as ActivatedRouteSnapshot;
    const routerStateMock = {} as RouterStateSnapshot;

    const result$ = TestBed.runInInjectionContext(() => {
      return usersResolver(routeMock, routerStateMock) as Observable<IUser[]>;
    });

    expect(adminApiMock.getUsers).toHaveBeenCalled();
    result$.subscribe((users) => {
      expect(users[0].id).toBe('u1');
      expect(users[0].name).toBe('João');
    });
  });
});
