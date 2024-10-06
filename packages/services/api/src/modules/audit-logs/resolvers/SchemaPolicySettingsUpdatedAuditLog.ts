import { SchemaPolicySettingsUpdatedAuditLogResolvers } from '../../../__generated__/types';

export const SchemaPolicySettingsUpdatedAuditLog: SchemaPolicySettingsUpdatedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'SCHEMA_POLICY_SETTINGS_UPDATED',
  eventTime: e => {
    const eventTime = new Date(e.event_time);
    return eventTime.toISOString();
  },
  id: e => e.id,
  organizationId: e => e.organization_id,
  projectId: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'SCHEMA_POLICY_SETTINGS_UPDATED' &&
      parsedMetadata.typeFields.eventType === 'SCHEMA_POLICY_SETTINGS_UPDATED'
    ) {
      return parsedMetadata.typeFields.SchemaPolicySettingsUpdatedAuditLogSchema.projectId;
    }
    throw new Error('Invalid eventType');
  },
  updatedFields: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'SCHEMA_POLICY_SETTINGS_UPDATED' &&
      parsedMetadata.typeFields.eventType === 'SCHEMA_POLICY_SETTINGS_UPDATED'
    ) {
      return parsedMetadata.typeFields.SchemaPolicySettingsUpdatedAuditLogSchema.updatedFields;
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
