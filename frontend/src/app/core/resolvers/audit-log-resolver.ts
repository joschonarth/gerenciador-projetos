import { ResolveFn } from '@angular/router';
import { IAuditLog } from '../models';
import { inject } from '@angular/core';
import { AdminApi } from '../services/admin-api';

export const auditLogResolver: ResolveFn<IAuditLog[]> = (route) => {
  const adminApi = inject(AdminApi);

  return adminApi.getAuditLog();
};
