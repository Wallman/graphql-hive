import type { SchemaCheckedAuditLogResolvers } from './../../../__generated__/types.next';

export const SchemaCheckedAuditLog: SchemaCheckedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'SCHEMA_CHECKED',
  eventTime: e => new Date(e.event_time).toISOString(),
  id: e => e.id,
  organizationId: e => e.organization_id,
  projectId: e => e.metadata.schemaCheckedAuditLogSchema.projectId,
  schemaSdl: e => e.metadata.schemaCheckedAuditLogSchema.schemaSdl,
  targetId: e => e.metadata.schemaCheckedAuditLogSchema.targetId,
  user: e => {
    return {
      userEmail: e.user_email,
      userId: e.user_id,
      user: e.metadata.user,
      __typename: 'AuditLogUserRecord',
    };
  },
};
