import type { SchemaPolicySettingsUpdatedAuditLogResolvers } from './../../../__generated__/types.next';

export const SchemaPolicySettingsUpdatedAuditLog: SchemaPolicySettingsUpdatedAuditLogResolvers = {
  __isTypeOf: parent => parent.__typename === 'SchemaPolicySettingsUpdatedAuditLog',
  eventTime: parent => parent.eventTime,
  id: parent => parent.id,
  organizationId: parent => parent.organizationId,
  projectId: parent => parent.projectId,
  updatedFields: parent => parent.updatedFields,
  user: parent => parent.user,
};
