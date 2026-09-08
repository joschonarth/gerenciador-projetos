import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthManager } from './auth-manager';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';

describe('Auth Manager Service', () => {
  let service: AuthManager;
  let httpTestingController: HttpTestingController;
  let routerMock = {
    navigate: vi.fn(),
  };

  beforeEach(() => {
    localStorage.clear();

    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        AuthManager,
        { provide: Router, useValue: routerMock },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(AuthManager);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('deve fazer o login, salvar os dados e disparar o tap() com sucesso', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    service.login('admin@teste.com').subscribe((response) => {
      expect(response.token).toBe('meu_token_secreto');
    });

    const req = httpTestingController.expectOne('http://localhost:3000/api/auth/login');

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'admin@teste.com' });

    req.flush({
      token: 'meu_token_secreto',
      user: { id: 1, nome: 'Admin', role: 'admin' },
    });

    expect(setItemSpy).toHaveBeenCalledTimes(2);
    expect(setItemSpy).toHaveBeenCalledWith('token', 'meu_token_secreto');
    expect(setItemSpy).toHaveBeenCalledWith(
      'user',
      JSON.stringify({ id: 1, nome: 'Admin', role: 'admin' }),
    );

    expect(service.getToken()).toBe('meu_token_secreto');
    expect(service.user()).toEqual({ id: 1, nome: 'Admin', role: 'admin' });

    expect(service.isAuthenticated()).toBe(true);
    expect(service.isAdmin()).toBe(true);
  });

  it('deve abortar as lógicas do tap() se a API retornar erro HTTP 401', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    service.login('invalido@teste.com').subscribe({
      error: (httpError: HttpErrorResponse) => {
        expect(httpError.status).toBe(401);
        expect(httpError.error.message).toBe('Credenciais inválidas');
      },
    });

    const req = httpTestingController.expectOne('http://localhost:3000/api/auth/login');

    req.flush({ message: 'Credenciais inválidas' }, { status: 401, statusText: 'Unauthorized' });

    expect(setItemSpy).not.toHaveBeenCalled();

    expect(service.isAuthenticated()).toBe(false);
    expect(service.getToken()).toBeNull();
  });
});
