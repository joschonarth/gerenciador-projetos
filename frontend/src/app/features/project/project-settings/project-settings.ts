import { Component, inject } from '@angular/core';
import { IProject } from '../../../core/models';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-project-settings',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './project-settings.html',
})
export class ProjectSettings {
  private readonly _activatedRoute = inject(ActivatedRoute);

  project: IProject = this._activatedRoute.snapshot.data['project'];
}
