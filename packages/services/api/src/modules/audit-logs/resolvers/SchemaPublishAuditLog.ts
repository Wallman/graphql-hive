import { SchemaPublishAuditLogResolvers } from '../../../__generated__/types';

export const SchemaPublishAuditLog: SchemaPublishAuditLogResolvers = {
  __isTypeOf: e => e.event_action === 'SCHEMA_PUBLISH',
  eventTime: e => {
    const eventTime = new Date(e.event_time);
    return eventTime.toISOString();
  },
  id: e => e.id,
  organizationId: e => e.organization_id,
  projectId: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'SCHEMA_PUBLISH' &&
      parsedMetadata.typeFields.eventType === 'SCHEMA_PUBLISH'
    ) {
      return parsedMetadata.typeFields.SchemaPublishAuditLogSchema.projectId;
    }
    throw new Error('Invalid eventType');
  },
  targetId: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'SCHEMA_PUBLISH' &&
      parsedMetadata.typeFields.eventType === 'SCHEMA_PUBLISH'
    ) {
      return parsedMetadata.typeFields.SchemaPublishAuditLogSchema.targetId;
    }
    throw new Error('Invalid eventType');
  },
  schemaName: e => {
    const parsedMetadata = JSON.parse(e.metadata);

    if (
      e.event_action === 'SCHEMA_PUBLISH' &&
      parsedMetadata.typeFields.eventType === 'SCHEMA_PUBLISH'
    ) {
      return parsedMetadata.typeFields.SchemaPublishAuditLogSchema.schemaName;
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
