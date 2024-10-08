import type { RoleCreatedAuditLogResolvers } from './../../../__generated__/types.next';

export const RoleCreatedAuditLog: RoleCreatedAuditLogResolvers = {
  __isTypeOf: parent => parent.__typename === 'RoleCreatedAuditLog',
  eventTime: parent => parent.eventTime,
  id: parent => parent.id,
  organizationId: parent => parent.organizationId,
  roleId: parent => parent.roleId,
  roleName: parent => parent.roleName,
  user: parent => parent.user,
};
