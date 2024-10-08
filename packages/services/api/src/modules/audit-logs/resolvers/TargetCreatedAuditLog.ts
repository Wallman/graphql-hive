import type { TargetCreatedAuditLogResolvers } from './../../../__generated__/types.next';

export const TargetCreatedAuditLog: TargetCreatedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'TARGET_CREATED',
  eventTime: e => new Date(e.event_time).toISOString(),
  id: e => e.id,
  organizationId: e => e.organization_id,
  projectId: e => e.metadata.targetCreatedAuditLogSchema.projectId,
  targetName: e => e.metadata.targetCreatedAuditLogSchema.targetName,
  targetId: e => e.metadata.targetCreatedAuditLogSchema.target,
  user: e => {
    return {
      userEmail: e.user_email,
      userId: e.user_id,
      user: e.metadata.user,
      __typename: 'AuditLogUserRecord',
    };
  },
};
