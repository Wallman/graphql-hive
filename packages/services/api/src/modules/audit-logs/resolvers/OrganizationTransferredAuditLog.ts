import type { OrganizationTransferredAuditLogResolvers } from './../../../__generated__/types.next';

export const OrganizationTransferredAuditLog: OrganizationTransferredAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'ORGANIZATION_TRANSFERRED',
  eventTime: e => new Date(e.event_time).toISOString(),
  id: e => e.id,
  newOwnerEmail: e => e.metadata.organizationTransferredAuditLogSchema.newOwnerEmail,
  newOwnerId: e => e.metadata.organizationTransferredAuditLogSchema.newOwnerId,
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
