import type { UserJoinedAuditLogResolvers } from './../../../__generated__/types.next';

export const UserJoinedAuditLog: UserJoinedAuditLogResolvers = {
  __isTypeOf: parent => parent.__typename === 'UserJoinedAuditLog',
  eventTime: parent => parent.eventTime,
  id: parent => parent.id,
  organizationId: parent => parent.organizationId,
  inviteeEmail: parent => parent.inviteeEmail,
  inviteeId: parent => parent.inviteeId,
  user: parent => parent.user,
};
