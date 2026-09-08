import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { IProject, ITask } from '../../../core/models';

@Component({
  selector: 'app-backlog',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './backlog.html',
})
export class Backlog {
  private readonly _activatedRoute = inject(ActivatedRoute);

  project: IProject = this._activatedRoute.snapshot.data['project'];

  tasks = signal<ITask[]>(this._activatedRoute.snapshot.data['tasks'] || []);

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      todo: 'A Fazer',
      in_progress: 'Em Progresso',
      done: 'Concluído',
    };
    return map[status] || status;
  }
}
