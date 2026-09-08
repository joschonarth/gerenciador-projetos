import { HasUnsavedChanges, unsavedChangesGuard } from './unsaved-changes-guard';

describe('Unsaved Changes Guard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve permitir a saída imediata se não houver alterações', () => {
    const mockComponent: HasUnsavedChanges = {
      hasUnsavedChanges: () => false,
    };

    const result = unsavedChangesGuard(mockComponent, null as any, null as any, null as any);

    expect(result).toBe(true);
  });

  it('deve exibir um confirm e retornar a escolha do usuário se houver alterações', () => {
    const mockComponent: HasUnsavedChanges = {
      hasUnsavedChanges: () => true,
    };

    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false);

    const result = unsavedChangesGuard(mockComponent, null as any, null as any, null as any);

    expect(confirmSpy).toHaveBeenCalledWith('Você tem alterações não salvas. Deseja sair?');
    expect(result).toBe(false);
  });
});
