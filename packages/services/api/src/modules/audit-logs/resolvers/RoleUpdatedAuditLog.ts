import type { RoleUpdatedAuditLogResolvers } from './../../../__generated__/types.next';

export const RoleUpdatedAuditLog: RoleUpdatedAuditLogResolvers = {
  __isTypeOf: parent => parent.__typename === 'RoleUpdatedAuditLog',
  eventTime: parent => parent.eventTime,
  id: parent => parent.id,
  organizationId: parent => parent.organizationId,
  roleId: parent => parent.roleId,
  roleName: parent => parent.roleName,
  updatedFields: parent => parent.updatedFields,
  user: parent => parent.user,
};
