import { UserInvitedAuditLogResolvers } from '../../../__generated__/types';

export const UserInvitedAuditLog: UserInvitedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'USER_INVITED',
  eventTime: e => e.event_time,
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
  user: e => {
    return {
      userEmail: e.user_email,
      userId: e.user_id,
      user: JSON.parse(e.metadata).user,
      __typename: 'AuditLogUserRecord',
    };
  },
};
