import { TestBed } from '@angular/core/testing';
import { CustomTitleStrategy } from './custom-title-strategy';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot } from '@angular/router';

describe('Custom Title Strategy', () => {
  let strategy: CustomTitleStrategy;
  let titleServiceMock: any;

  beforeEach(() => {
    titleServiceMock = {
      setTitle: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [CustomTitleStrategy, { provide: Title, useValue: titleServiceMock }],
    });

    strategy = TestBed.inject(CustomTitleStrategy);
  });

  it('deve definir o título concatenado com o nome do app quando a rota possuir um título', () => {
    vi.spyOn(strategy, 'buildTitle').mockReturnValue('Dashboard');

    strategy.updateTitle({} as RouterStateSnapshot);

    expect(titleServiceMock.setTitle).toHaveBeenCalledWith('Dashboard | Gestão de Projetos');
  });

  it('deve definir apenas o nome do app caso a rota não possua título', () => {
    vi.spyOn(strategy, 'buildTitle').mockReturnValue(undefined);

    strategy.updateTitle({} as RouterStateSnapshot);

    expect(titleServiceMock.setTitle).toHaveBeenCalledWith('Gestão de Projetos');
  });
});
