import type { SchemaDeletedAuditLogResolvers } from './../../../__generated__/types.next';

export const SchemaDeletedAuditLog: SchemaDeletedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'SCHEMA_DELETED',
  eventTime: e => new Date(e.event_time).toISOString(),
  id: e => e.id,
  organizationId: e => e.organization_id,
  projectId: e => e.metadata.schemaDeletedAuditLogSchema.projectId,
  schemaName: e => e.metadata.schemaDeletedAuditLogSchema.schemaName,
  targetId: e => e.metadata.schemaDeletedAuditLogSchema.targetId,
  user: e => {
    return {
      userEmail: e.user_email,
      userId: e.user_id,
      user: e.metadata.user,
      __typename: 'AuditLogUserRecord',
    };
  },
};
