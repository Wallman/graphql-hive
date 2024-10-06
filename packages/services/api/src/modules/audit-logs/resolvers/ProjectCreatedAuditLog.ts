import { ProjectCreatedAuditLogResolvers } from '../../../__generated__/types';

export const ProjectCreatedAuditLog: ProjectCreatedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'PROJECT_CREATED',
  eventTime: e => e.event_time,
  id: e => e.id,
  organizationId: e => e.organization_id,
  projectId: e => {
    const parsedMetadata = JSON.parse(e.metadata);
    if (
      e.event_action === 'PROJECT_CREATED' &&
      parsedMetadata.typeFields.eventType === 'PROJECT_CREATED'
    ) {
      return parsedMetadata.typeFields.ProjectCreatedAuditLogSchema.projectId;
    }
    throw new Error('Invalid eventType');
  },
  projectName: e => {
    const parsedMetadata = JSON.parse(e.metadata);
    if (
      e.event_action === 'PROJECT_CREATED' &&
      parsedMetadata.typeFields.eventType === 'PROJECT_CREATED'
    ) {
      return parsedMetadata.typeFields.ProjectCreatedAuditLogSchema.projectName;
    }
    throw new Error('Invalid eventType');
  },
  user: e => {
    return {
      userEmail: e.user_email,
      userId: e.user_id,
      user: JSON.parse(e.metadata).user,
      __typename: 'AuditLogUserRecord',
    };
  },
};
