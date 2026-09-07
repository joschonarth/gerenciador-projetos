import { Component } from '@angular/core';
import { IProject } from '../../../core/models';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-project-settings',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './project-settings.html',
})
export class ProjectSettings {
  project: IProject = {
    id: 'PRJ-101',
    name: 'Projeto Phoenix',
    description: 'Plataforma de gestão de projetos ágeis com IA',
  };
}
