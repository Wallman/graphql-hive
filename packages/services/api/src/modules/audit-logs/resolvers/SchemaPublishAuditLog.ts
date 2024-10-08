import type { SchemaPublishAuditLogResolvers } from './../../../__generated__/types.next';

export const SchemaPublishAuditLog: SchemaPublishAuditLogResolvers = {
  __isTypeOf: parent => parent.__typename === 'SchemaPublishAuditLog',
  eventTime: parent => parent.eventTime,
  id: parent => parent.id,
  organizationId: parent => parent.organizationId,
  projectId: parent => parent.projectId,
  schemaName: parent => parent.schemaName,
  targetId: parent => parent.targetId,
  user: parent => parent.user,
};
