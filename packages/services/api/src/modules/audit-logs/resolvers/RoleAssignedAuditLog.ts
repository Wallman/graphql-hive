import type { RoleAssignedAuditLogResolvers } from './../../../__generated__/types';

export const RoleAssignedAuditLog: RoleAssignedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'ROLE_ASSIGNED',
  eventTime: e => {
    const eventTime = new Date(e.event_time);
    return eventTime.toISOString();
  },
  id: e => e.id,
  organizationId: e => e.organization_id,
  roleId: e => {
    const parsedMetadata = JSON.parse(e.metadata);
    if (
      e.event_action === 'ROLE_ASSIGNED' &&
      parsedMetadata.typeFields.eventType === 'ROLE_ASSIGNED'
    ) {
      return parsedMetadata.typeFields.RoleAssignedAuditLogSchema.roleId;
    }
    throw new Error('Invalid eventType');
  },
  roleName: e => {
    const parsedMetadata = JSON.parse(e.metadata);
    if (
      e.event_action === 'ROLE_ASSIGNED' &&
      parsedMetadata.typeFields.eventType === 'ROLE_ASSIGNED'
    ) {
      return parsedMetadata.typeFields.RoleAssignedAuditLogSchema.roleName;
    }
    throw new Error('Invalid eventType');
  },
  userEmailAssigned: e => {
    const parsedMetadata = JSON.parse(e.metadata);
    if (
      e.event_action === 'ROLE_ASSIGNED' &&
      parsedMetadata.typeFields.eventType === 'ROLE_ASSIGNED'
    ) {
      return parsedMetadata.typeFields.RoleAssignedAuditLogSchema.userEmailAssigned;
    }
    throw new Error('Invalid eventType');
  },
  userIdAssigned: e => {
    const parsedMetadata = JSON.parse(e.metadata);
    if (
      e.event_action === 'ROLE_ASSIGNED' &&
      parsedMetadata.typeFields.eventType === 'ROLE_ASSIGNED'
    ) {
      return parsedMetadata.typeFields.RoleAssignedAuditLogSchema.userIdAssigned;
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
