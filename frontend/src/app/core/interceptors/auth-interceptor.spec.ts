import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthManager } from '../services/auth-manager';
import { authInterceptor } from './auth-interceptor';

describe('Auth Interceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authManagerMock = {
    getToken: vi.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthManager, useValue: authManagerMock },
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('deve enexar o token de autorização no cabeçalho se o usuário possuir token', () => {
    authManagerMock.getToken.mockReturnValue('token_usuario_valido');

    httpClient.get('/api/minha-rota').subscribe();

    const req = httpTestingController.expectOne('/api/minha-rota');

    expect(req.request.headers.has('Authorization')).toBe(true);
    expect(req.request.headers.get('Authorization')).toBe('Bearer token_usuario_valido');

    req.flush({});
  });

  it('não deve anexar o header se o usuário não estiver logado', () => {
    authManagerMock.getToken.mockReturnValue(null);

    httpClient.get('/api/minha-rota').subscribe();
    const req = httpTestingController.expectOne('/api/minha-rota');

    expect(req.request.headers.has('Authorization')).toBe(false);

    req.flush({});
  });
});
