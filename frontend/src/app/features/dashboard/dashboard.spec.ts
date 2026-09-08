import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dashboard } from './dashboard';
import { of } from 'rxjs';
import { IProject } from '../../core/models';
import { provideRouter } from '@angular/router';
import { ProjectApi } from '../../core/services/project-api';

describe('Dashboard Component', () => {
  let fixture: ComponentFixture<Dashboard>;
  let component: Dashboard;

  let projectApiMock = {
    getAll: vi
      .fn()
      .mockReturnValue(
        of([
          { id: 'p1', name: 'Aplicação Angular', description: 'App com Angular' } as IProject,
          { id: 'p2', name: 'Aplicação React', description: 'App com React' } as IProject,
        ]),
      ),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [provideRouter([]), { provide: ProjectApi, useValue: projectApiMock }],
    });

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('deve extrair os projetos da API e atualizar as métricas na tela', () => {
    expect(projectApiMock.getAll).toHaveBeenCalled();
    expect(component.projects().length).toBe(2);

    const htmlCompleto = fixture.nativeElement.innerHTML;

    expect(htmlCompleto).toContain('2');
  });

  it('deve renderizar a quantidade correta de cards através do @for', () => {
    const projectCards = fixture.nativeElement.querySelectorAll('[data-testid="project-card"]');

    expect(projectCards.length).toBe(2);

    expect(fixture.nativeElement.innerHTML).toContain('Aplicação Angular');
    expect(fixture.nativeElement.innerHTML).toContain('Aplicação React');
  });
});
