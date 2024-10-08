import type { RoleDeletedAuditLogResolvers } from './../../../__generated__/types.next';

export const RoleDeletedAuditLog: RoleDeletedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'ROLE_DELETED',
  eventTime: e => new Date(e.event_time).toISOString(),
  id: e => e.id,
  organizationId: e => e.organization_id,
  roleId: e => e.metadata.roleDeletedAuditLogSchema.roleId,
  roleName: e => e.metadata.roleDeletedAuditLogSchema.roleName,
  user: e => {
    return {
      userEmail: e.user_email,
      userId: e.user_id,
      user: e.metadata.user,
      __typename: 'AuditLogUserRecord',
    };
  },
};
