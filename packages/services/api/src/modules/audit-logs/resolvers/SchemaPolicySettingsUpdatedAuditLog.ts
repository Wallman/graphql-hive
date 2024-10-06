import { SchemaPolicySettingsUpdatedAuditLogResolvers } from '../../../__generated__/types';

export const SchemaPolicySettingsUpdatedAuditLog: SchemaPolicySettingsUpdatedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'SCHEMA_POLICY_SETTINGS_UPDATED',
  eventTime: e => e.event_time,
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
  user: e => {
    return {
      userEmail: e.user_email,
      userId: e.user_id,
      user: JSON.parse(e.metadata).user,
      __typename: 'AuditLogUserRecord',
    };
  },
};
