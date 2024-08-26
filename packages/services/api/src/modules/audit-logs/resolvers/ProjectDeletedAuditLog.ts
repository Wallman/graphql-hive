import type { ProjectDeletedAuditLogResolvers } from './../../../__generated__/types';

export const ProjectDeletedAuditLog: ProjectDeletedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'PROJECT_DELETED',
  eventTime: e => {
    const eventTime = new Date(e.event_time);
    return eventTime.toISOString();
  },
  id: e => e.id,
  organizationId: e => e.organization_id,
  projectId: e => {
    const parsedMetadata = JSON.parse(e.metadata);
    if (
      e.event_action === 'PROJECT_DELETED' &&
      parsedMetadata.typeFields.eventType === 'PROJECT_DELETED'
    ) {
      return parsedMetadata.typeFields.ProjectDeletedAuditLogSchema.projectId;
    }
    throw new Error('Invalid eventType');
  },
  projectName: e => {
    const parsedMetadata = JSON.parse(e.metadata);
    if (
      e.event_action === 'PROJECT_DELETED' &&
      parsedMetadata.typeFields.eventType === 'PROJECT_DELETED'
    ) {
      return parsedMetadata.typeFields.ProjectDeletedAuditLogSchema.projectName;
    }
    throw new Error('Invalid eventType');
  },
  user: async parent => {
    return {
      userEmail: parent.user_email,
      userId: parent.user_id,
      __typename: 'AuditLogUserRecord',
    };
  },
};
