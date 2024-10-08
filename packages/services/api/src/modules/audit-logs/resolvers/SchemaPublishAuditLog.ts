import type { SchemaPublishAuditLogResolvers } from './../../../__generated__/types.next';

export const SchemaPublishAuditLog: SchemaPublishAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'SCHEMA_PUBLISH',
  eventTime: e => new Date(e.event_time).toISOString(),
  id: e => e.id,
  organizationId: e => e.organization_id,
  projectId: e => e.metadata.schemaPublishAuditLogSchema.projectId,
  schemaName: e => e.metadata.schemaPublishAuditLogSchema.schemaName,
  targetId: e => e.metadata.schemaPublishAuditLogSchema.target,
  user: e => {
    return {
      userEmail: e.user_email,
      userId: e.user_id,
      user: e.metadata.user,
      __typename: 'AuditLogUserRecord',
    };
  },
};
