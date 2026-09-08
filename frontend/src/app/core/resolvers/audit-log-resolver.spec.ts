import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { AdminApi } from '../services/admin-api';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { auditLogResolver } from './audit-log-resolver';
import { IAuditLog } from '../models';

describe('Audit Log Resolver', () => {
  let adminApiMock = {
    getAuditLog: vi.fn().mockReturnValue(of([{ id: 'a1', action: 'create' }])),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AdminApi, useValue: adminApiMock }],
    });
  });

  it('deve buscar o histórico de auditoria na API', () => {
    const routeMock = {} as ActivatedRouteSnapshot;
    const routerStateMock = {} as RouterStateSnapshot;

    const result$ = TestBed.runInInjectionContext(() => {
      return auditLogResolver(routeMock, routerStateMock) as Observable<IAuditLog[]>;
    });

    expect(adminApiMock.getAuditLog).toHaveBeenCalled();
    result$.subscribe((auditLog) => {
      expect(auditLog[0].id).toBe('a1');
      expect(auditLog[0].action).toBe('create');
    });
  });
});
