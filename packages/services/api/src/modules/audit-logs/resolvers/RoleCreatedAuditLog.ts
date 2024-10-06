import { RoleCreatedAuditLogResolvers } from '../../../__generated__/types';

export const RoleCreatedAuditLog: RoleCreatedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'ROLE_CREATED',
  eventTime: e => {
    const eventTime = new Date(e.event_time);
    return eventTime.toISOString();
  },
  id: e => e.id,
  organizationId: e => e.organization_id,
  roleId: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'ROLE_CREATED' &&
      parsedMetadata.typeFields.eventType === 'ROLE_CREATED'
    ) {
      return parsedMetadata.typeFields.RoleCreatedAuditLogSchema.roleId;
    }
    throw new Error('Invalid eventType');
  },
  roleName: e => {
    const parsedMetadata = JSON.parse(e.metadata);
    if (
      e.event_action === 'ROLE_CREATED' &&
      parsedMetadata.typeFields.eventType === 'ROLE_CREATED'
    ) {
      return parsedMetadata.typeFields.RoleCreatedAuditLogSchema.roleName;
    }
    throw new Error('Invalid eventType');
  },
  user: async parent => {
    return {
      userEmail: parent.user_email,
      userId: parent.user_id,
      user: JSON.parse(parent.metadata).user,
      __typename: 'AuditLogUserRecord',
    };
  },
};
