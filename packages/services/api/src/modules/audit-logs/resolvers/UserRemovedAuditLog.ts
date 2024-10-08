import type { UserRemovedAuditLogResolvers } from './../../../__generated__/types.next';

export const UserRemovedAuditLog: UserRemovedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'USER_REMOVED',
  eventTime: e => new Date(e.event_time).toISOString(),
  id: e => e.id,
  organizationId: e => e.organization_id,
  removedUserEmail: e => e.metadata.userRemovedAuditLogSchema.removedUserEmail,
  removedUserId: e => e.metadata.userRemovedAuditLogSchema.removedUserId,
  user: e => {
    return {
      userEmail: e.user_email,
      userId: e.user_id,
      user: e.metadata.user,
      __typename: 'AuditLogUserRecord',
    };
  },
};
