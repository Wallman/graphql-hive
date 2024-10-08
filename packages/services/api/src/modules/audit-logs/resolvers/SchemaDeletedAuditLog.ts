import type { SchemaDeletedAuditLogResolvers } from './../../../__generated__/types.next';

export const SchemaDeletedAuditLog: SchemaDeletedAuditLogResolvers = {
  __isTypeOf: parent => parent.__typename === 'SchemaDeletedAuditLog',
  eventTime: parent => parent.eventTime,
  id: parent => parent.id,
  organizationId: parent => parent.organizationId,
  projectId: parent => parent.projectId,
  schemaName: parent => parent.schemaName,
  targetId: parent => parent.targetId,
  user: parent => parent.user,
};
