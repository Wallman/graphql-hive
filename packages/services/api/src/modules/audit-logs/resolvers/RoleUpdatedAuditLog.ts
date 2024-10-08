import type { RoleUpdatedAuditLogResolvers } from './../../../__generated__/types.next';

export const RoleUpdatedAuditLog: RoleUpdatedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'ROLE_UPDATED',
  eventTime: e => new Date(e.event_time).toISOString(),
  id: e => e.id,
  organizationId: e => e.organization_id,
  roleId: e => e.metadata.roleUpdatedAuditLogSchema.roleId,
  roleName: e => e.metadata.roleUpdatedAuditLogSchema.roleName,
  updatedFields: e => e.metadata.roleUpdatedAuditLogSchema.updatedFields,
  user: e => {
    return {
      userEmail: e.user_email,
      userId: e.user_id,
      user: e.metadata.user,
      __typename: 'AuditLogUserRecord',
    };
  },
};
