import type { ProjectSettingsUpdatedAuditLogResolvers } from './../../../__generated__/types.next';

export const ProjectSettingsUpdatedAuditLog: ProjectSettingsUpdatedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'PROJECT_SETTINGS_UPDATED',
  eventTime: e => {
    const time = new Date(e.event_time);
    return time.toISOString();
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
  user: e => {
    return {
      userEmail: e.user_email,
      userId: e.user_id,
      user: JSON.parse(e.metadata).user,
      __typename: 'AuditLogUserRecord',
    };
  },
};
