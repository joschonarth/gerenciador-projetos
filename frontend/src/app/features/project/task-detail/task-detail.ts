import { Component, OnInit, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITask } from '../../../core/models';
import { TaskApi } from '../../../core/services/task-api';
import { HasUnsavedChanges } from '../../../core/guards/unsaved-changes-guard';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  imports: [FormsModule],
  templateUrl: './task-detail.html',
  styleUrls: ['./task-detail.scss'],
})
export class TaskDetail implements OnInit, HasUnsavedChanges {
  private readonly _taskApi = inject(TaskApi);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  task = signal<ITask>(this._activatedRoute.snapshot.data['task'] || null);

  editedTask = signal<ITask | null>(
    this._activatedRoute.snapshot.data['task']
      ? { ...this._activatedRoute.snapshot.data['task'] }
      : null,
  );

  isDirty = signal(false);
  isSaving = signal(false);

  ngOnInit(): void {}

  hasUnsavedChanges(): boolean {
    return this.isDirty();
  }

  markDirty(): void {
    this.isDirty.set(true);
  }

  save(): void {
    const currentEdited = this.editedTask();
    if (!currentEdited) return;
    this.isSaving.set(true);
    this._taskApi.update(currentEdited.id, currentEdited).subscribe({
      next: (updated) => {
        this.task.set(updated);
        this.isDirty.set(false);
        this.isSaving.set(false);
      },
      error: () => {
        this.isSaving.set(false);
      },
    });
  }

  close(): void {
    this._router.navigate([{ outlets: { detail: null } }], {
      relativeTo: this._activatedRoute.parent,
    });
  }
}
