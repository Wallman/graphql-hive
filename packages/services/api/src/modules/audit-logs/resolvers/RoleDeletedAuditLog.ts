import type { RoleDeletedAuditLogResolvers } from './../../../__generated__/types.next';

export const RoleDeletedAuditLog: RoleDeletedAuditLogResolvers = {
  __isTypeOf: parent => parent.__typename === 'RoleDeletedAuditLog',
  eventTime: parent => parent.eventTime,
  id: parent => parent.id,
  organizationId: parent => parent.organizationId,
  roleId: parent => parent.roleId,
  roleName: parent => parent.roleName,
  user: parent => parent.user,
};
