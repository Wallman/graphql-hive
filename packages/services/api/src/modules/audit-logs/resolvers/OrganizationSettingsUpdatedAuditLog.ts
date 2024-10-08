import type { OrganizationSettingsUpdatedAuditLogResolvers } from './../../../__generated__/types.next';

export const OrganizationSettingsUpdatedAuditLog: OrganizationSettingsUpdatedAuditLogResolvers = {
  __isTypeOf: parent => parent.__typename === 'OrganizationSettingsUpdatedAuditLog',
  eventTime: parent => parent.eventTime,
  id: parent => parent.id,
  organizationId: parent => parent.organizationId,
  updatedFields: parent => parent.updatedFields,
  user: parent => parent.user,
};
