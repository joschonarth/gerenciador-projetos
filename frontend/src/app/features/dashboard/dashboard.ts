import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProjectApi } from '../../core/services/project-api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly _projectApi = inject(ProjectApi);
  projects = toSignal(this._projectApi.getAll(), { initialValue: [] });
}
