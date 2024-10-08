import type { TargetCreatedAuditLogResolvers } from './../../../__generated__/types.next';

export const TargetCreatedAuditLog: TargetCreatedAuditLogResolvers = {
  __isTypeOf: parent => parent.__typename === 'TargetCreatedAuditLog',
  eventTime: parent => parent.eventTime,
  id: parent => parent.id,
  organizationId: parent => parent.organizationId,
  projectId: parent => parent.projectId,
  targetName: parent => parent.targetName,
  targetId: parent => parent.targetId,
  user: parent => parent.user,
};
