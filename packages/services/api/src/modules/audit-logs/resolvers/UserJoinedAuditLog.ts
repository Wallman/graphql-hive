import { UserJoinedAuditLogResolvers } from '../../../__generated__/types';

export const UserJoinedAuditLog: UserJoinedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'USER_JOINED',
  eventTime: e => {
    const eventTime = new Date(e.event_time);
    return eventTime.toISOString();
  },
  id: e => e.id,
  organizationId: e => e.organization_id,
  inviteeEmail: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (e.event_action === 'USER_JOINED' && parsedMetadata.typeFields.eventType === 'USER_JOINED') {
      return parsedMetadata.typeFields.UserJoinedAuditLogSchema.inviteeEmail;
    }
    throw new Error('Invalid eventType');
  },
  inviteeId: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (e.event_action === 'USER_JOINED' && parsedMetadata.typeFields.eventType === 'USER_JOINED') {
      return parsedMetadata.typeFields.UserJoinedAuditLogSchema.inviteeId;
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
