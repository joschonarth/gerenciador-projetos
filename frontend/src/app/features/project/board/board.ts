import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProjectApi } from '../../../core/services/project-api';
import { IProject, ITask } from '../../../core/models';

@Component({
  selector: 'app-board',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './board.html',
})
export class Board {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _projectApi = inject(ProjectApi);

  project: IProject = this._activatedRoute.snapshot.data['project'];

  tasks = signal<ITask[]>(this._activatedRoute.snapshot.data['tasks']);

  todoTasks = computed(() => this.tasks().filter((t) => t.status === 'todo'));
  inProgressTasks = computed(() => this.tasks().filter((t) => t.status === 'in_progress'));
  doneTasks = computed(() => this.tasks().filter((t) => t.status === 'done'));

  loadTasks(): void {
    this._projectApi.getTasks(this.project.id).subscribe((tasks) => {
      this.tasks.set(tasks);
    });
  }

  openTask(taskId: string): void {
    this._router.navigate([{ outlets: { detail: ['task', taskId] } }], {
      relativeTo: this._activatedRoute.parent,
    });
  }
}
