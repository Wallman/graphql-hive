import { OrganizationTransferredAuditLogResolvers } from '../../../__generated__/types';

export const OrganizationTransferredAuditLog: OrganizationTransferredAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'ORGANIZATION_TRANSFERRED',
  eventTime: e => {
    const eventTime = new Date(e.event_time);
    return eventTime.toISOString();
  },
  id: e => e.id,
  newOwnerEmail: e => {
    const parsedMetadata = JSON.parse(e.metadata);
    if (
      e.event_action === 'ORGANIZATION_TRANSFERRED' &&
      parsedMetadata.eventType === 'ORGANIZATION_TRANSFERRED'
    ) {
      return parsedMetadata.typeFields.OrganizationTransferredAuditLogSchema.newOwnerEmail;
    }
    throw new Error('Invalid eventType');
  },
  newOwnerId: e => {
    const parsedMetadata = JSON.parse(e.metadata);
    if (
      e.event_action === 'ORGANIZATION_TRANSFERRED' &&
      parsedMetadata.typeFields.eventType === 'ORGANIZATION_TRANSFERRED'
    ) {
      return parsedMetadata.typeFields.OrganizationTransferredAuditLogSchema.newOwnerId;
    }
    throw new Error('Invalid eventType');
  },
  organizationId: e => e.organization_id,
  user: e => {
    return {
      userEmail: e.user_email,
      userId: e.user_id,
      __typename: 'AuditLogUserRecord',
    };
  },
};
