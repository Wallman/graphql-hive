import type { UserInvitedAuditLogResolvers } from './../../../__generated__/types.next';

export const UserInvitedAuditLog: UserInvitedAuditLogResolvers = {
  __isTypeOf: parent => parent.__typename === 'UserInvitedAuditLog',
  eventTime: parent => parent.eventTime,
  id: parent => parent.id,
  organizationId: parent => parent.organizationId,
  inviteeEmail: parent => parent.inviteeEmail,
  inviteeId: parent => parent.inviteeId,
  user: parent => parent.user,
};
