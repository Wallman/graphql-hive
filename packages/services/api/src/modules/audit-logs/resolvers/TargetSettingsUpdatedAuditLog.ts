import type { TargetSettingsUpdatedAuditLogResolvers } from './../../../__generated__/types.next';

export const TargetSettingsUpdatedAuditLog: TargetSettingsUpdatedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'TARGET_SETTINGS_UPDATED',
  eventTime: e => new Date(e.event_time).toISOString(),
  id: e => e.id,
  organizationId: e => e.organization_id,
  projectId: e => e.metadata.targetSettingsUpdatedAuditLogSchema.projectId,
  updatedFields: e => e.metadata.targetSettingsUpdatedAuditLogSchema.updatedFields,
  targetId: e => e.metadata.targetSettingsUpdatedAuditLogSchema.target,
  user: e => {
    return {
      userEmail: e.user_email,
      userId: e.user_id,
      user: e.metadata.user,
      __typename: 'AuditLogUserRecord',
    };
  },
};
