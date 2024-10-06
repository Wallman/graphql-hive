import { OrganizationSettingsUpdatedAuditLogResolvers } from '../../../__generated__/types';

export const OrganizationSettingsUpdatedAuditLog: OrganizationSettingsUpdatedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'ORGANIZATION_SETTINGS_UPDATED',
  eventTime: e => {
    const time = new Date(e.event_time);
    return time.toISOString();
  },
  id: e => e.id,
  updatedFields: e => {
    const parsedMetadata = JSON.parse(e.metadata);
    if (
      e.event_action === 'ORGANIZATION_SETTINGS_UPDATED' &&
      parsedMetadata.typeFields.eventType === 'ORGANIZATION_SETTINGS_UPDATED'
    ) {
      return parsedMetadata.typeFields.OrganizationSettingsUpdatedAuditLogSchema.updatedFields;
    }
    throw new Error('Invalid eventType');
  },
  organizationId: e => e.organization_id,
  user: e => {
    return {
      userEmail: e.user_email,
      userId: e.user_id,
      user: JSON.parse(e.metadata).user,
      __typename: 'AuditLogUserRecord',
    };
  },
};
