import { Component, signal } from '@angular/core';
import { HasRoleDirective } from './has-role-directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthManager } from '../../core/services/auth-manager';
import { By } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [HasRoleDirective],
  template: `
    <div *hasRole="'admin'" data-testid="admin-content">Área de Risco</div>
    <div *hasRole="'manager'" data-testid="manager-content">Área do Cliente</div>
  `,
})
class TestHostComponent {}

describe('Has Role Directive', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let userMockSignal = signal<any>(null);

  let authManagerMock = {
    user: userMockSignal,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [{ provide: AuthManager, useValue: authManagerMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
  });

  it('não deve renderizar nenhuma das divs se o usuário não estiver logado', () => {
    fixture.detectChanges();

    const adminDiv = fixture.debugElement.query(By.css('[data-testid="admin-content"]'));
    const managerDiv = fixture.debugElement.query(By.css('[data-testid="manager-content"]'));

    expect(adminDiv).toBeFalsy();
    expect(managerDiv).toBeFalsy();
  });

  it('deve injetar a div de ADMIN e destruir as outras quando o signal for de um administrador', () => {
    userMockSignal.set({ role: 'admin' });

    fixture.detectChanges();

    const adminDiv = fixture.debugElement.query(By.css('[data-testid="admin-content"]'));
    const managerDiv = fixture.debugElement.query(By.css('[data-testid="manager-content"]'));

    expect(adminDiv).toBeTruthy();
    expect(managerDiv).toBeFalsy();
  });

  it('deve destruir a div de ADMIN e mostrar a do MANAGER se o usuário trocar de cargo na mesma sessão', () => {
    userMockSignal.set({ role: 'admin' });
    fixture.detectChanges();

    userMockSignal.set({ role: 'manager' });
    fixture.detectChanges();

    const adminDiv = fixture.debugElement.query(By.css('[data-testid="admin-content"]'));
    const managerDiv = fixture.debugElement.query(By.css('[data-testid="manager-content"]'));

    expect(adminDiv).toBeFalsy();
    expect(managerDiv).toBeTruthy();
  });
});
