import type { RoleUpdatedAuditLogResolvers } from './../../../__generated__/types.next';

export const RoleUpdatedAuditLog: RoleUpdatedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'ROLE_UPDATED',
  eventTime: e => {
    const time = new Date(e.event_time);
    return time.toISOString();
  },
  id: e => e.id,
  organizationId: e => e.organization_id,
  roleId: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'ROLE_UPDATED' &&
      parsedMetadata.typeFields.eventType === 'ROLE_UPDATED'
    ) {
      return parsedMetadata.typeFields.RoleUpdatedAuditLogSchema.roleId;
    }
    throw new Error('Invalid eventType');
  },
  updatedFields: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'ROLE_UPDATED' &&
      parsedMetadata.typeFields.eventType === 'ROLE_UPDATED'
    ) {
      return parsedMetadata.typeFields.RoleUpdatedAuditLogSchema.updatedFields;
    }
    throw new Error('Invalid eventType');
  },
  roleName: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'ROLE_UPDATED' &&
      parsedMetadata.typeFields.eventType === 'ROLE_UPDATED'
    ) {
      return parsedMetadata.typeFields.RoleUpdatedAuditLogSchema.roleName;
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
