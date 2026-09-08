import { of } from 'rxjs';
import { ITask } from '../../../core/models';
import { TestBed } from '@angular/core/testing';
import { TaskApi } from '../../../core/services/task-api';
import { provideRouter, Router } from '@angular/router';
import { TaskDetail } from './task-detail';
import { RouterTestingHarness } from '@angular/router/testing';

describe('Task Details Component', () => {
  const mockTaskOriginal: ITask = {
    id: 't-123',
    title: 'Arrumar CSS',
    description: 'A tela tá feia',
    status: 'todo',
    projectId: 'p-1',
    assigneeId: 'u-1',
  };

  const mockTaskEdited = { ...mockTaskOriginal, title: 'Título Modificado' };

  let taskApiMock = {
    update: vi.fn().mockReturnValue(of(mockTaskEdited)),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TaskApi, useValue: taskApiMock },
        provideRouter([
          {
            path: 'project/task',
            component: TaskDetail,
            data: {
              task: mockTaskOriginal,
            },
          },
        ]),
      ],
    });
  });

  it('deve extrair a task da URL, permitir a digitação e Salvar a tarefa chamando a API', async () => {
    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl('/project/task', TaskDetail);

    await harness.fixture.whenStable();

    const html = harness.routeNativeElement!;

    const titleInput = html.querySelector('[data-testid="task-title-input"]') as HTMLInputElement;
    expect(titleInput.value).toBe('Arrumar CSS');

    titleInput.value = 'Título Modificado';
    titleInput.dispatchEvent(new Event('input'));

    harness.detectChanges();

    expect(component.isDirty()).toBe(true);

    const saveBtn = html.querySelector('[data-testid="save-task-btn"]') as HTMLButtonElement;
    expect(saveBtn.disabled).toBe(false);

    saveBtn.click();

    expect(taskApiMock.update).toHaveBeenCalledWith(
      't-123',
      expect.objectContaining({
        title: 'Título Modificado',
      }),
    );
  });

  it('deve fechar o modal corretamente navegando o Router', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/project/task', TaskDetail);
    await harness.fixture.whenStable();
    const html = harness.routeNativeElement!;

    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate');

    const closeBtn = html.querySelector('[data-testid="close-modal-btn"]') as HTMLButtonElement;
    closeBtn.click();

    expect(navigateSpy).toHaveBeenCalledWith([{ outlets: { detail: null } }], expect.anything());
  });
});
