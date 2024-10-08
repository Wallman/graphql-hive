import type { SchemaCheckedAuditLogResolvers } from './../../../__generated__/types.next';

export const SchemaCheckedAuditLog: SchemaCheckedAuditLogResolvers = {
  __isTypeOf: parent => parent.__typename === 'SchemaCheckedAuditLog',
  eventTime: parent => parent.eventTime,
  id: parent => parent.id,
  organizationId: parent => parent.organizationId,
  projectId: parent => parent.projectId,
  schemaSdl: parent => parent.schemaSdl,
  targetId: parent => parent.targetId,
  user: parent => parent.user,
};
