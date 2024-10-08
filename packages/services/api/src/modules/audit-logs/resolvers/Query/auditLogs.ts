import { AuditLogManager } from '../../providers/audit-logs-manager';
import type { QueryResolvers } from './../../../../__generated__/types.next';

export const auditLogs: NonNullable<QueryResolvers['auditLogs']> = async (_parent, arg, ctx) => {
  const countAuditLogs = await ctx.injector.get(AuditLogManager).getAuditLogsCount();
  if (countAuditLogs === 0) {
    return {
      nodes: [],
      total: 0,
      __typename: 'AuditLogConnection',
    };
  }

  const { limit, offset, filter } = arg;
  const auditLogs = await ctx.injector.get(AuditLogManager).getPaginatedAuditLogs({
    filter,
    limit,
    offset,
  });

  return {
    nodes: auditLogs,
    total: countAuditLogs,
    __typename: 'AuditLogConnection',
  };
};

export function getAuditLogTypename(eventType: string): string {
  switch (eventType) {
    case 'USER_INVITED':
      return 'UserInvitedAuditLog';
    case 'USER_JOINED':
      return 'UserJoinedAuditLog';
    case 'USER_REMOVED':
      return 'UserRemovedAuditLog';
    case 'ORGANIZATION_SETTINGS_UPDATED':
      return 'OrganizationSettingsUpdatedAuditLog';
    case 'ORGANIZATION_TRANSFERRED':
      return 'OrganizationTransferredAuditLog';
    case 'PROJECT_CREATED':
      return 'ProjectCreatedAuditLog';
    case 'PROJECT_SETTINGS_UPDATED':
      return 'ProjectSettingsUpdatedAuditLog';
    case 'PROJECT_DELETED':
      return 'ProjectDeletedAuditLog';
    case 'TARGET_CREATED':
      return 'TargetCreatedAuditLog';
    case 'TARGET_SETTINGS_UPDATED':
      return 'TargetSettingsUpdatedAuditLog';
    case 'TARGET_DELETED':
      return 'TargetDeletedAuditLog';
    case 'SCHEMA_POLICY_SETTINGS_UPDATED':
      return 'SchemaPolicySettingsUpdatedAuditLog';
    case 'SCHEMA_CHECKED':
      return 'SchemaCheckedAuditLog';
    case 'SCHEMA_PUBLISH':
      return 'SchemaPublishAuditLog';
    case 'SCHEMA_DELETED':
      return 'SchemaDeletedAuditLog';
    case 'ROLE_CREATED':
      return 'RoleCreatedAuditLog';
    case 'ROLE_ASSIGNED':
      return 'RoleAssignedAuditLog';
    case 'ROLE_DELETED':
      return 'RoleDeletedAuditLog';
    case 'ROLE_UPDATED':
      return 'RoleUpdatedAuditLog';
    default:
      throw new Error(`Unknown eventType: ${eventType}`);
  }
}
