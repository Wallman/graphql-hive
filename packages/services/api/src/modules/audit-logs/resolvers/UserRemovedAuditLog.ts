import type { UserRemovedAuditLogResolvers } from './../../../__generated__/types.next';

export const UserRemovedAuditLog: UserRemovedAuditLogResolvers = {
  __isTypeOf: parent => parent.__typename === 'UserRemovedAuditLog',
  eventTime: parent => parent.eventTime,
  id: parent => parent.id,
  organizationId: parent => parent.organizationId,
  removedUserEmail: parent => parent.removedUserEmail,
  removedUserId: parent => parent.removedUserId,
  user: parent => parent.user,
};
