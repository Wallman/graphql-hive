import type { UserRemovedAuditLogResolvers } from './../../../__generated__/types';

export const UserRemovedAuditLog: UserRemovedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'USER_REMOVED',
  eventTime: e => {
    const eventTime = new Date(e.event_time);
    return eventTime.toISOString();
  },
  id: e => e.id,
  organizationId: e => e.organization_id,
  removedUserEmail: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'USER_REMOVED' &&
      parsedMetadata.typeFields.eventType === 'USER_REMOVED'
    ) {
      return parsedMetadata.typeFields.UserRemovedAuditLogSchema.removedUserEmail;
    }
    throw new Error('Invalid eventType');
  },
  removedUserId: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'USER_REMOVED' &&
      parsedMetadata.typeFields.eventType === 'USER_REMOVED'
    ) {
      return parsedMetadata.typeFields.UserRemovedAuditLogSchema.removedUserId;
    }
    throw new Error('Invalid eventType');
  },
  user: async parent => {
    return {
      userEmail: parent.user_email,
      userId: parent.user_id,
      __typename: 'AuditLogUserRecord',
    };
  },
};
