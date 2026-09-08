import { TestBed } from '@angular/core/testing';
import { RedirectCommand, Router, UrlTree } from '@angular/router';
import { AuthManager } from '../services/auth-manager';
import { authGuard } from './auth-guard';

describe('Auth Guard', () => {
  const authManagerMock = {
    isAuthenticated: vi.fn(),
  };

  const routerMock = {
    createUrlTree: vi.fn().mockRejectedValue({} as UrlTree),
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

  it('deve permitir a passagem (true) se o usuário estiver logado', () => {
    authManagerMock.isAuthenticated.mockReturnValue(true);

    const result = TestBed.runInInjectionContext(() => {
      return authGuard(null as any, null as any, null as any);
    });

    expect(result).toBe(true);
  });

  it('deve retornar um RedirectCommand para /login se não estiver logado', () => {
    authManagerMock.isAuthenticated.mockReturnValue(false);

    const result = TestBed.runInInjectionContext(() => {
      return authGuard(null as any, null as any, null as any);
    });

    expect(authManagerMock.isAuthenticated).toHaveBeenCalled();
    expect(routerMock.createUrlTree).toHaveBeenCalledWith(['/login']);

    expect(result).toBeInstanceOf(RedirectCommand);
  });
});
