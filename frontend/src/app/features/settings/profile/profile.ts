import { Component, inject } from '@angular/core';
import { AuthManager } from '../../../core/services/auth-manager';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './profile.html',
})
export class Profile {
  readonly _authManager = inject(AuthManager);
}
