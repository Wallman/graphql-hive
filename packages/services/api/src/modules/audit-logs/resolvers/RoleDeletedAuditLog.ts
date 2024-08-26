import type { RoleDeletedAuditLogResolvers } from './../../../__generated__/types';

export const RoleDeletedAuditLog: RoleDeletedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'ROLE_DELETED',
  eventTime: e => {
    const eventTime = new Date(e.event_time);
    return eventTime.toISOString();
  },
  id: e => e.id,
  organizationId: e => e.organization_id,
  roleId: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'ROLE_DELETED' &&
      parsedMetadata.typeFields.eventType === 'ROLE_DELETED'
    ) {
      return parsedMetadata.typeFields.RoleDeletedAuditLogSchema.roleId;
    }
    throw new Error('Invalid eventType');
  },
  roleName: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'ROLE_DELETED' &&
      parsedMetadata.typeFields.eventType === 'ROLE_DELETED'
    ) {
      return parsedMetadata.typeFields.RoleDeletedAuditLogSchema.roleName;
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
