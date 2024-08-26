import type { SchemaCheckedAuditLogResolvers } from './../../../__generated__/types';

export const SchemaCheckedAuditLog: SchemaCheckedAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'SCHEMA_CHECKED',
  eventTime: e => {
    const eventTime = new Date(e.event_time);
    return eventTime.toISOString();
  },
  id: e => e.id,
  organizationId: e => e.organization_id,
  projectId: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'SCHEMA_CHECKED' &&
      parsedMetadata.typeFields.eventType === 'SCHEMA_CHECKED'
    ) {
      return parsedMetadata.typeFields.SchemaCheckedAuditLogSchema.projectId;
    }
    throw new Error('Invalid eventType');
  },
  schemaSdl: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'SCHEMA_CHECKED' &&
      parsedMetadata.typeFields.eventType === 'SCHEMA_CHECKED'
    ) {
      return parsedMetadata.typeFields.SchemaCheckedAuditLogSchema.schemaSdl;
    }
    throw new Error('Invalid eventType');
  },
  targetId: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'SCHEMA_CHECKED' &&
      parsedMetadata.typeFields.eventType === 'SCHEMA_CHECKED'
    ) {
      return parsedMetadata.typeFields.SchemaCheckedAuditLogSchema.targetId;
    }
    throw new Error('Invalid eventType');
  },
  user: async parent => {
    return {
      userEmail: parent.user_email,
      userId: parent.user_id,
      __typename: 'AuditLogUserRecord',
    };
  },
};
