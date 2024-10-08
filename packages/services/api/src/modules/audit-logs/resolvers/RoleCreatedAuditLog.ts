import type { RoleCreatedAuditLogResolvers } from './../../../__generated__/types.next';

export const RoleCreatedAuditLog: RoleCreatedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'ROLE_CREATED',
  eventTime: e => new Date(e.event_time).toISOString(),
  id: e => e.id,
  organizationId: e => e.organization_id,
  roleId: e => e.metadata.roleCreatedAuditLogSchema.roleId,
  roleName: e => e.metadata.roleCreatedAuditLogSchema.roleName,
  user: e => {
    return {
      userEmail: e.user_email,
      userId: e.user_id,
      user: e.metadata.user,
      __typename: 'AuditLogUserRecord',
    };
  },
};
