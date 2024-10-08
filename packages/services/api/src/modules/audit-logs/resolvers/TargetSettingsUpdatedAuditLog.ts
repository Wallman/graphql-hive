import type { TargetSettingsUpdatedAuditLogResolvers } from './../../../__generated__/types.next';

export const TargetSettingsUpdatedAuditLog: TargetSettingsUpdatedAuditLogResolvers = {
  __isTypeOf: parent => parent.__typename === 'TargetSettingsUpdatedAuditLog',
  eventTime: parent => parent.eventTime,
  id: parent => parent.id,
  organizationId: parent => parent.organizationId,
  projectId: parent => parent.projectId,
  updatedFields: parent => parent.updatedFields,
  targetId: parent => parent.targetId,
  user: parent => parent.user,
};
