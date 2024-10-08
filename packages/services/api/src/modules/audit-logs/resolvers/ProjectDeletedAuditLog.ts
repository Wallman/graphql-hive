import type { ProjectDeletedAuditLogResolvers } from './../../../__generated__/types.next';

export const ProjectDeletedAuditLog: ProjectDeletedAuditLogResolvers = {
  __isTypeOf: parent => parent.__typename === 'ProjectDeletedAuditLog',
  eventTime: parent => parent.eventTime,
  id: parent => parent.id,
  organizationId: parent => parent.organizationId,
  projectId: parent => parent.projectId,
  projectName: parent => parent.projectName,
  user: parent => parent.user,
};
