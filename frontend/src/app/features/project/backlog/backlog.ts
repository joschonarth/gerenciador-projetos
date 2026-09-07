import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { IProject, ITask } from '../../../core/models';

@Component({
  selector: 'app-backlog',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './backlog.html',
})
export class Backlog {
  project: IProject = {
    id: 'PRJ-101',
    name: 'Projeto Phoenix',
    description: 'Plataforma de gestão de projetos ágeis com IA',
  };
  tasks = signal<ITask[]>([]);

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      todo: 'A Fazer',
      in_progress: 'Em Progresso',
      done: 'Concluído',
    };
    return map[status] || status;
  }
}
