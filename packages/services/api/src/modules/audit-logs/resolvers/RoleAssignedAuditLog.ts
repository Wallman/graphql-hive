import type { RoleAssignedAuditLogResolvers } from './../../../__generated__/types.next';

export const RoleAssignedAuditLog: RoleAssignedAuditLogResolvers = {
  __isTypeOf: parent => parent.__typename === 'RoleAssignedAuditLog',
  eventTime: parent => parent.eventTime,
  id: parent => parent.id,
  organizationId: parent => parent.organizationId,
  roleId: parent => parent.roleId,
  roleName: parent => parent.roleName,
  userEmailAssigned: parent => parent.userEmailAssigned,
  userIdAssigned: parent => parent.userIdAssigned,
  user: parent => parent.user,
};
