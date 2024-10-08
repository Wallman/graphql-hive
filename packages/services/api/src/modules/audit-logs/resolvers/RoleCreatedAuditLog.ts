import type { RoleCreatedAuditLogResolvers } from './../../../__generated__/types.next';

export const RoleCreatedAuditLog: RoleCreatedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'ROLE_CREATED',
  eventTime: e => {
    const time = new Date(e.event_time);
    return time.toISOString();
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
  user: e => {
    return {
      userEmail: e.user_email,
      userId: e.user_id,
      user: JSON.parse(e.metadata).user,
      __typename: 'AuditLogUserRecord',
    };
  },
};
