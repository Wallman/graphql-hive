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
