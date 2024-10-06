import { TargetDeletedAuditLogResolvers } from '../../../__generated__/types';

export const TargetDeletedAuditLog: TargetDeletedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'TARGET_DELETED',
  eventTime: e => {
    const eventTime = new Date(e.event_time);
    return eventTime.toISOString();
  },
  id: e => e.id,
  organizationId: e => e.organization_id,
  projectId: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'TARGET_DELETED' &&
      parsedMetadata.typeFields.eventType === 'TARGET_DELETED'
    ) {
      return parsedMetadata.typeFields.TargetDeletedAuditLogSchema.projectId;
    }
    throw new Error('Invalid eventType');
  },
  targetId: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'TARGET_DELETED' &&
      parsedMetadata.typeFields.eventType === 'TARGET_DELETED'
    ) {
      return parsedMetadata.typeFields.TargetDeletedAuditLogSchema.targetId;
    }
    throw new Error('Invalid eventType');
  },
  targetName: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'TARGET_DELETED' &&
      parsedMetadata.typeFields.eventType === 'TARGET_DELETED'
    ) {
      return parsedMetadata.typeFields.TargetDeletedAuditLogSchema.targetName;
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
