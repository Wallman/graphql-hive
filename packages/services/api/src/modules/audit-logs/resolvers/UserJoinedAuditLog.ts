import { UserJoinedAuditLogResolvers } from '../../../__generated__/types';

export const UserJoinedAuditLog: UserJoinedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'USER_JOINED',
  eventTime: e => {
    const time = new Date(e.event_time);
    return time.toISOString();
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
  user: e => {
    return {
      userEmail: e.user_email,
      userId: e.user_id,
      user: JSON.parse(e.metadata).user,
      __typename: 'AuditLogUserRecord',
    };
  },
};
