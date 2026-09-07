import { Component, inject } from '@angular/core';
import { AuthManager } from '../../../core/services/auth-manager';
import { InitialsPipe } from '../../pipes/initials-pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [InitialsPipe, RouterLink],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  readonly _authManager = inject(AuthManager);

  logout(): void {
    this._authManager.logout();
  }
}
