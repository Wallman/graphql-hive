import type { ProjectSettingsUpdatedAuditLogResolvers } from './../../../__generated__/types.next';

export const ProjectSettingsUpdatedAuditLog: ProjectSettingsUpdatedAuditLogResolvers = {
  __isTypeOf: parent => parent.__typename === 'ProjectSettingsUpdatedAuditLog',
  eventTime: parent => parent.eventTime,
  id: parent => parent.id,
  organizationId: parent => parent.organizationId,
  projectId: parent => parent.projectId,
  updatedFields: parent => parent.updatedFields,
  user: parent => parent.user,
};
