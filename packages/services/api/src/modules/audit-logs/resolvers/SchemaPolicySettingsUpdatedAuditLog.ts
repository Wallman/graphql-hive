import type { SchemaPolicySettingsUpdatedAuditLogResolvers } from './../../../__generated__/types.next';

export const SchemaPolicySettingsUpdatedAuditLog: SchemaPolicySettingsUpdatedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'SCHEMA_POLICY_SETTINGS_UPDATED',
  eventTime: e => new Date(e.event_time).toISOString(),
  id: e => e.id,
  organizationId: e => e.organization_id,
  projectId: e => e.metadata.schemaPolicySettingsUpdatedAuditLogSchema.projectId,
  updatedFields: e => e.metadata.schemaPolicySettingsUpdatedAuditLogSchema.updatedFields,
  user: e => {
    return {
      userEmail: e.user_email,
      userId: e.user_id,
      user: e.metadata.user,
      __typename: 'AuditLogUserRecord',
    };
  },
};
