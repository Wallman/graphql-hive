import type { ProjectDeletedAuditLogResolvers } from './../../../__generated__/types.next';

export const ProjectDeletedAuditLog: ProjectDeletedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'PROJECT_DELETED',
  eventTime: e => new Date(e.event_time).toISOString(),
  id: e => e.id,
  organizationId: e => e.organization_id,
  projectId: e => e.metadata.projectDeletedAuditLogSchema.projectId,
  projectName: e => e.metadata.projectDeletedAuditLogSchema.projectName,
  user: e => {
    return {
      userEmail: e.user_email,
      userId: e.user_id,
      user: e.metadata.user,
      __typename: 'AuditLogUserRecord',
    };
  },
};
