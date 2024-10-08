import type { SchemaDeletedAuditLogResolvers } from './../../../__generated__/types.next';

export const SchemaDeletedAuditLog: SchemaDeletedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'SCHEMA_DELETED',
  eventTime: e => {
    const time = new Date(e.event_time);
    return time.toISOString();
  },
  id: e => e.id,
  organizationId: e => e.organization_id,
  projectId: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'SCHEMA_DELETED' &&
      parsedMetadata.typeFields.eventType === 'SCHEMA_DELETED'
    ) {
      return parsedMetadata.typeFields.SchemaDeletedAuditLogSchema.projectId;
    }
    throw new Error('Invalid eventType');
  },
  schemaName: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'SCHEMA_DELETED' &&
      parsedMetadata.typeFields.eventType === 'SCHEMA_DELETED'
    ) {
      return parsedMetadata.typeFields.SchemaDeletedAuditLogSchema.schemaName;
    }
    throw new Error('Invalid eventType ');
  },
  targetId: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'SCHEMA_DELETED' &&
      parsedMetadata.typeFields.eventType === 'SCHEMA_DELETED'
    ) {
      return parsedMetadata.typeFields.SchemaDeletedAuditLogSchema.targetId;
    }
    throw new Error('Invalid eventType');
  },
  user: e => {
    return {
      userEmail: e.user_email,
      userId: e.user_id,
      user: JSON.parse(e.metadata).user,
      __typename: 'AuditLogUserRecord',
    };
  },
};
