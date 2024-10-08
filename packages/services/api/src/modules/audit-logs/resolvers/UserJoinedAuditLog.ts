import type { UserJoinedAuditLogResolvers } from './../../../__generated__/types.next';

export const UserJoinedAuditLog: UserJoinedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'USER_JOINED',
  eventTime: e => new Date(e.event_time).toISOString(),
  id: e => e.id,
  organizationId: e => e.organization_id,
  inviteeEmail: e => e.metadata.userJoinedAuditLogSchema.inviteeEmail,
  inviteeId: e => e.metadata.userJoinedAuditLogSchema.inviteeId,
  user: e => {
    return {
      userEmail: e.user_email,
      userId: e.user_id,
      user: e.metadata.user,
      __typename: 'AuditLogUserRecord',
    };
  },
};
