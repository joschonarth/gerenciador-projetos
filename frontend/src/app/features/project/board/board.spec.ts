import { TestBed } from '@angular/core/testing';
import { IProject, ITask } from '../../../core/models';
import { provideRouter, Router } from '@angular/router';
import { Board } from './board';
import { RouterTestingHarness } from '@angular/router/testing';

describe('Board Component', () => {
  const mockProject: IProject = {
    id: 'p-1',
    name: 'App iOS',
    description: '...',
  };
  const mockTasks: ITask[] = [
    { id: 't-1', title: 'Fazer o Design', status: 'todo', projectId: 'p-1', description: '...' },
    {
      id: 't-2',
      title: 'Codar a Tela',
      status: 'in_progress',
      projectId: 'p-1',
      description: '...',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          {
            path: 'project/board',
            component: Board,
            data: {
              project: mockProject,
              tasks: mockTasks,
            },
          },
        ]),
      ],
    });
  });

  it('deve filtrar as tarefas corretamente usando computed signals e renderizar nas colunas', async () => {
    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl('/project/board', Board);
    const html = harness.routeNativeElement!;

    expect(component.todoTasks().length).toBe(1);
    expect(component.inProgressTasks().length).toBe(1);
    expect(component.doneTasks().length).toBe(0);

    const todoColumn = html.querySelector('[data-testid="todo-column"]');
    const inProgressColumn = html.querySelector('[data-testid="in-progress-column"]');

    const cardsNoTodo = todoColumn?.querySelectorAll('[data-testid="task-card"]');
    const cardsNoInProgress = inProgressColumn?.querySelectorAll('[data-testid="task-card"]');

    expect(cardsNoTodo?.length).toBe(1);
    expect(cardsNoInProgress?.length).toBe(1);

    expect(todoColumn?.innerHTML).toContain('Fazer o Design');
    expect(inProgressColumn?.innerHTML).toContain('Codar a Tela');
  });

  it('deve abrir o modal de detalhes (Task Detail) ao clicar em um card', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/project/board', Board);
    const html = harness.routeNativeElement!;

    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate');

    const firstTaskCard = html.querySelector('[data-testid="task-card"]') as HTMLDivElement;

    firstTaskCard.click();

    expect(navigateSpy).toHaveBeenCalledWith(
      [{ outlets: { detail: ['task', 't-1'] } }],
      expect.anything(),
    );
  });
});
