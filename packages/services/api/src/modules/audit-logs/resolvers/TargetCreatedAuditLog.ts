import { TargetCreatedAuditLogResolvers } from '../../../__generated__/types';

export const TargetCreatedAuditLog: TargetCreatedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'TARGET_CREATED',
  eventTime: e => {
    const time = new Date(e.event_time);
    return time.toISOString();
  },
  id: e => e.id,
  organizationId: e => e.organization_id,
  projectId: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'TARGET_CREATED' &&
      parsedMetadata.typeFields.eventType === 'TARGET_CREATED'
    ) {
      return parsedMetadata.typeFields.TargetCreatedAuditLogSchema.projectId;
    }
    throw new Error('Invalid eventType');
  },
  targetId: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'TARGET_CREATED' &&
      parsedMetadata.typeFields.eventType === 'TARGET_CREATED'
    ) {
      return parsedMetadata.typeFields.TargetCreatedAuditLogSchema.targetId;
    }
    throw new Error('Invalid eventType');
  },
  targetName: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'TARGET_CREATED' &&
      parsedMetadata.typeFields.eventType === 'TARGET_CREATED'
    ) {
      return parsedMetadata.typeFields.TargetCreatedAuditLogSchema.targetName;
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
