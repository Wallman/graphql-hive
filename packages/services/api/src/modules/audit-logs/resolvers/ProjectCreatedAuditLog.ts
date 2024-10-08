import type { ProjectCreatedAuditLogResolvers } from './../../../__generated__/types.next';

export const ProjectCreatedAuditLog: ProjectCreatedAuditLogResolvers = {
  __isTypeOf: parent => {
    console.log('parent', parent);
    return parent.__typename === 'ProjectCreatedAuditLog';
  },
  eventTime: parent => parent.eventTime,
  id: parent => parent.id,
  organizationId: parent => parent.organizationId,
  projectId: parent => parent.projectId,
  projectName: parent => parent.projectName,
  user: parent => parent.user,
};
