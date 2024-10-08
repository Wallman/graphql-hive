import type { RoleAssignedAuditLogResolvers } from './../../../__generated__/types.next';

export const RoleAssignedAuditLog: RoleAssignedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'ROLE_ASSIGNED',
  eventTime: e => new Date(e.event_time).toISOString(),
  id: e => e.id,
  organizationId: e => e.organization_id,
  roleId: e => e.metadata.roleAssignedAuditLogSchema.roleId,
  roleName: e => e.metadata.roleAssignedAuditLogSchema.roleName,
  userEmailAssigned: e => e.metadata.roleAssignedAuditLogSchema.userEmailAssigned,
  userIdAssigned: e => e.metadata.roleAssignedAuditLogSchema.userIdAssigned,
  user: e => {
    return {
      userEmail: e.user_email,
      userId: e.user_id,
      user: e.metadata.user,
      __typename: 'AuditLogUserRecord',
    };
  },
};
