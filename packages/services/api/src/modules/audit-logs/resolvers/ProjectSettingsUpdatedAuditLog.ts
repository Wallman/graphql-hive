import type { ProjectSettingsUpdatedAuditLogResolvers } from './../../../__generated__/types.next';

export const ProjectSettingsUpdatedAuditLog: ProjectSettingsUpdatedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'PROJECT_SETTINGS_UPDATED',
  eventTime: e => new Date(e.event_time).toISOString(),
  id: e => e.id,
  organizationId: e => e.organization_id,
  projectId: e => e.metadata.projectSettingsUpdatedAuditLogSchema.projectId,
  updatedFields: e => e.metadata.projectSettingsUpdatedAuditLogSchema.updatedFields,
  user: e => {
    return {
      userEmail: e.user_email,
      userId: e.user_id,
      user: e.metadata.user,
      __typename: 'AuditLogUserRecord',
    };
  },
};
