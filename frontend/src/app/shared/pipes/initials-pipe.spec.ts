import { InitialsPipe } from './initials-pipe';

describe('Initials Pipes', () => {
  let pipe: InitialsPipe;

  beforeEach(() => {
    pipe = new InitialsPipe();
  });

  it('deve retornar vazio se o valor for nulo ou indefinido', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
    expect(pipe.transform('')).toBe('');
  });

  it('deve retornar a primeira letra maiúscula se houver apenas um nome', () => {
    expect(pipe.transform('joão')).toBe('J');
  });

  it('deve retornar as duas primeiras iniciais maiúsculas em nomes compostos', () => {
    expect(pipe.transform('joão silva')).toBe('JS');
  });

  it('deve ignorar espaços extras e ainda funcionar', () => {
    expect(pipe.transform('joão    silva')).toBe('J');
  });
});
