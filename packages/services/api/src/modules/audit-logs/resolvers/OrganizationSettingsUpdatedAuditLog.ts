import type { OrganizationSettingsUpdatedAuditLogResolvers } from './../../../__generated__/types.next';

export const OrganizationSettingsUpdatedAuditLog: OrganizationSettingsUpdatedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'ORGANIZATION_SETTINGS_UPDATED',
  eventTime: e => new Date(e.event_time).toISOString(),
  id: e => e.id,
  updatedFields: e => e.metadata.projectSettingsUpdatedAuditLogSchema.updatedFields,
  organizationId: e => e.organization_id,
  user: e => {
    return {
      userEmail: e.user_email,
      userId: e.user_id,
      user: e.metadata.user,
      __typename: 'AuditLogUserRecord',
    };
  },
};
