import { TestBed } from '@angular/core/testing';
import { RedirectCommand, Router, UrlTree } from '@angular/router';
import { AuthManager } from '../services/auth-manager';
import { roleGuard } from './role-guard';

describe('Role Guard', () => {
  const authManagerMock = {
    user: vi.fn(),
  };

  const routerMock = {
    createUrlTree: vi.fn().mockReturnValue({} as UrlTree),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthManager, useValue: authManagerMock },
        { provide: Router, useValue: routerMock },
      ],
    });
  });

  it('deve permitir a passagem se o cargo do usuário bater com o exigido', () => {
    authManagerMock.user.mockReturnValue({ role: 'admin' });

    const guardFn = roleGuard('admin');

    const result = TestBed.runInInjectionContext(() => {
      return guardFn(null as any, null as any);
    });

    expect(result).toBe(true);
  });

  it('deve redirecionar se o cargo for diferente do exigido', () => {
    authManagerMock.user.mockReturnValue({ role: 'membro' });

    const guardFn = roleGuard('admin');

    const result = TestBed.runInInjectionContext(() => {
      return guardFn(null as any, null as any);
    });

    expect(routerMock.createUrlTree).toHaveBeenCalledWith(['/login']);
    expect(result).instanceOf(RedirectCommand);
  });
});
