import type { OrganizationTransferredAuditLogResolvers } from './../../../__generated__/types.next';

export const OrganizationTransferredAuditLog: OrganizationTransferredAuditLogResolvers = {
  __isTypeOf: parent => parent.__typename === 'OrganizationTransferredAuditLog',
  eventTime: parent => parent.eventTime,
  id: parent => parent.id,
  organizationId: parent => parent.organizationId,
  newOwnerEmail: parent => parent.newOwnerEmail,
  newOwnerId: parent => parent.newOwnerId,
  user: parent => parent.user,
};
