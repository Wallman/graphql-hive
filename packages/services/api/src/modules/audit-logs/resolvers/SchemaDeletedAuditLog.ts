import { SchemaDeletedAuditLogResolvers } from '../../../__generated__/types';

export const SchemaDeletedAuditLog: SchemaDeletedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'SCHEMA_DELETED',
  eventTime: e => e.event_time,
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
  user: async parent => {
    return {
      userEmail: parent.user_email,
      userId: parent.user_id,
      user: JSON.parse(parent.metadata).user,
      __typename: 'AuditLogUserRecord',
    };
  },
};
