import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IAuditLog } from '../../../core/models';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-audit-log',
  imports: [DatePipe, RouterLink, RouterLinkActive],
  templateUrl: './audit-log.html',
})
export class AuditLog {
  private readonly _activatedRoute = inject(ActivatedRoute);

  logs = signal<IAuditLog[]>(this._activatedRoute.snapshot.data['logs']);
}
