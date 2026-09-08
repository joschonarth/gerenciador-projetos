import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthManager } from '../services/auth-manager';
import { Router } from '@angular/router';
import { errorInterceptor } from './error-interceptor';

describe('Error Interceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authManagerMock = {
    logout: vi.fn(),
  };
  let routerMock = {
    navigate: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthManager, useValue: authManagerMock },
        { provide: Router, useValue: routerMock },
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('deve forçar logout e redirecionar para /login se a resposta da API for 401', () => {
    httpClient.get('/api/minha-url').subscribe({
      error: () => {},
    });

    const req = httpTestingController.expectOne('/api/minha-url');
    req.flush('Acesso negado', { status: 401, statusText: 'Unauthorized' });

    expect(authManagerMock.logout).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('não deve fazer logout se o erro não for 401', () => {
    httpClient.get('/api/minha-url').subscribe({
      error: () => {},
    });

    const req = httpTestingController.expectOne('/api/minha-url');
    req.flush('Servidor indisponível', { status: 500, statusText: 'Internal Server Error' });

    expect(authManagerMock.logout).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
