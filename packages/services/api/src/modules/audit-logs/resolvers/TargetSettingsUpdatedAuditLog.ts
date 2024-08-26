import type { TargetSettingsUpdatedAuditLogResolvers } from './../../../__generated__/types';

export const TargetSettingsUpdatedAuditLog: TargetSettingsUpdatedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'TARGET_SETTINGS_UPDATED',
  eventTime: e => {
    const eventTime = new Date(e.event_time);
    return eventTime.toISOString();
  },
  id: e => e.id,
  organizationId: e => e.organization_id,
  projectId: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'TARGET_SETTINGS_UPDATED' &&
      parsedMetadata.typeFields.eventType === 'TARGET_SETTINGS_UPDATED'
    ) {
      return parsedMetadata.typeFields.TargetSettingsUpdatedAuditLogSchema.projectId;
    }
    throw new Error('Invalid eventType');
  },
  targetId: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'TARGET_SETTINGS_UPDATED' &&
      parsedMetadata.typeFields.eventType === 'TARGET_SETTINGS_UPDATED'
    ) {
      return parsedMetadata.typeFields.TargetSettingsUpdatedAuditLogSchema.targetId;
    }
    throw new Error('Invalid eventType');
  },
  updatedFields: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'TARGET_SETTINGS_UPDATED' &&
      parsedMetadata.typeFields.eventType === 'TARGET_SETTINGS_UPDATED'
    ) {
      return parsedMetadata.typeFields.TargetSettingsUpdatedAuditLogSchema.updatedFields;
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
