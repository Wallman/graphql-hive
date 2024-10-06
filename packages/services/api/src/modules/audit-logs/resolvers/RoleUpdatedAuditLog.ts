import { RoleUpdatedAuditLogResolvers } from '../../../__generated__/types';

export const RoleUpdatedAuditLog: RoleUpdatedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'ROLE_UPDATED',
  eventTime: e => {
    const eventTime = new Date(e.event_time);
    return eventTime.toISOString();
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
  user: async parent => {
    return {
      userEmail: parent.user_email,
      userId: parent.user_id,
      __typename: 'AuditLogUserRecord',
    };
  },
};
