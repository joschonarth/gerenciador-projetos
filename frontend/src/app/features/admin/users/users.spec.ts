import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Users } from './users';
import { RouterTestingHarness } from '@angular/router/testing';

describe('Users Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          {
            path: 'admin/users',
            component: Users,
            data: {
              users: [
                { id: '1', name: 'João', role: 'admin', email: 'joao@teste.com' },
                { id: '2', name: 'Carlos', role: 'member', email: 'carlos@teste.com' },
              ],
            },
          },
        ]),
      ],
    });
  });

  it('deve extrair os usuários da rota nativamente e renderizá-los via @for no html', async () => {
    const harness = await RouterTestingHarness.create();

    const component = await harness.navigateByUrl('/admin/users', Users);

    expect(component.users().length).toBe(2);
    expect(component.users()[0].name).toBe('João');

    const container = harness.routeNativeElement;
    const userCards = container?.querySelectorAll('[data-testid="user-card"]');

    expect(userCards?.length).toBe(2);

    expect(container?.innerHTML).toContain('João');
    expect(container?.innerHTML).toContain('Carlos');
  });
});
