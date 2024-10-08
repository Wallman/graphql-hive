import type { TargetDeletedAuditLogResolvers } from './../../../__generated__/types.next';

export const TargetDeletedAuditLog: TargetDeletedAuditLogResolvers = {
  __isTypeOf: parent => parent.__typename === 'TargetDeletedAuditLog',
  eventTime: parent => parent.eventTime,
  id: parent => parent.id,
  organizationId: parent => parent.organizationId,
  projectId: parent => parent.projectId,
  targetName: parent => parent.targetName,
  targetId: parent => parent.targetId,
  user: parent => parent.user,
};
