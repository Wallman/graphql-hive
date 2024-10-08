import type { TargetDeletedAuditLogResolvers } from './../../../__generated__/types.next';

export const TargetDeletedAuditLog: TargetDeletedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'TARGET_DELETED',
  eventTime: e => new Date(e.event_time).toISOString(),
  id: e => e.id,
  organizationId: e => e.organization_id,
  projectId: e => e.metadata.targetDeletedAuditLogSchema.projectId,
  targetName: e => e.metadata.targetDeletedAuditLogSchema.targetName,
  targetId: e => e.metadata.targetDeletedAuditLogSchema.target,
  user: e => {
    return {
      userEmail: e.user_email,
      userId: e.user_id,
      user: e.metadata.user,
      __typename: 'AuditLogUserRecord',
    };
  },
};
