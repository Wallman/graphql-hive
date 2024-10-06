import { ProjectSettingsUpdatedAuditLogResolvers } from '../../../__generated__/types';

export const ProjectSettingsUpdatedAuditLog: ProjectSettingsUpdatedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'PROJECT_SETTINGS_UPDATED',
  eventTime: e => {
    const eventTime = new Date(e.event_time);
    return eventTime.toISOString();
  },
  id: e => e.id,
  organizationId: e => e.organization_id,
  projectId: e => {
    const parsedMetadata = JSON.parse(e.metadata);
    if (
      e.event_action === 'PROJECT_SETTINGS_UPDATED' &&
      parsedMetadata.typeFields.eventType === 'PROJECT_SETTINGS_UPDATED'
    ) {
      return parsedMetadata.typeFields.ProjectSettingsUpdatedAuditLogSchema.projectId;
    }
    throw new Error('Invalid eventType');
  },
  updatedFields: e => {
    const parsedMetadata = JSON.parse(e.metadata);
    if (
      e.event_action === 'PROJECT_SETTINGS_UPDATED' &&
      parsedMetadata.typeFields.eventType === 'PROJECT_SETTINGS_UPDATED'
    ) {
      return parsedMetadata.typeFields.ProjectSettingsUpdatedAuditLogSchema.updatedFields;
    }
    throw new Error('Invalid eventType');
  },
  user: async parent => {
    return {
      userEmail: parent.user_email,
      userId: parent.user_id,
      user: JSON.parse(parent.metadata).user,
      __typename: 'AuditLogUserRecord',
    };
  },
};
