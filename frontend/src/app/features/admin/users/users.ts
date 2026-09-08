import { Component, inject, signal } from '@angular/core';
import { InitialsPipe } from '../../../shared/pipes/initials-pipe';
import { IUser } from '../../../core/models';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [InitialsPipe, RouterLink, RouterLinkActive],
  templateUrl: './users.html',
})
export class Users {
  private readonly _activatedRoute = inject(ActivatedRoute);

  users = signal<IUser[]>(this._activatedRoute.snapshot.data['users']);
}
