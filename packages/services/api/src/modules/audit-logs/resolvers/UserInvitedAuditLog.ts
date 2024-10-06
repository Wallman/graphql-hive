import { UserInvitedAuditLogResolvers } from '../../../__generated__/types';

export const UserInvitedAuditLog: UserInvitedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'USER_INVITED',
  eventTime: e => {
    const eventTime = new Date(e.event_time);
    return eventTime.toISOString();
  },
  id: e => e.id,
  organizationId: e => e.organization_id,
  inviteeEmail: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'USER_INVITED' &&
      parsedMetadata.typeFields.eventType === 'USER_INVITED'
    ) {
      return parsedMetadata.typeFields.UserInvitedAuditLogSchema.inviteeEmail;
    }
    throw new Error('Invalid eventType');
  },
  inviteeId: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'USER_INVITED' &&
      parsedMetadata.typeFields.eventType === 'USER_INVITED'
    ) {
      return parsedMetadata.typeFields.UserInvitedAuditLogSchema.inviteeId;
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
