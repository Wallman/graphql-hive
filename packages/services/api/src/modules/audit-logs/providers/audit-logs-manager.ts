import { Injectable, Scope } from 'graphql-modules';
import { z } from 'zod';
import { QueryAuditLogsArgs } from '../../../__generated__/types';
import { ClickHouse, sql } from '../../operations/providers/clickhouse-client';
import { Logger } from '../../shared/providers/logger';
import { AuditLogEvent, auditLogSchema } from './audit-logs-types';

const auditLogDbObject = z.object({
  id: z.string(),
  event_time: z.string(),
  user_id: z.string(),
  user_email: z.string(),
  organization_id: z.string(),
  event_action: z.string(),
  metadata: z.string(),
});
export type AuditLogModel = z.infer<typeof auditLogDbObject>;

const auditLogCount = z.object({
  'COUNT()': z.string(),
});

@Injectable({
  scope: Scope.Operation,
  global: true,
})
export class AuditLogManager {
  private logger: Logger;

  constructor(
    logger: Logger,
    private clickHouse: ClickHouse,
  ) {
    this.logger = logger.child({ source: 'AuditLogsManager' });
  }

  async createLogAuditEvent(event: AuditLogEvent): Promise<void> {
    const { eventType, organizationId, user } = event;
    this.logger.info('Creating a log audit event (event=%o)', event);

    const parsedEvent = auditLogSchema.parse(event);
    const metadata = {
      user: user.user,
      ...parsedEvent,
    };

    const eventMetadata = JSON.stringify(metadata);
    const eventTime = new Date();

    const values = [
      eventTime,
      user.userId,
      user.userEmail,
      organizationId,
      eventType,
      eventMetadata,
    ];

    await this.clickHouse.insert({
      query: sql`
      INSERT INTO audit_log
      (event_time, user_id, user_email, organization_id, event_action, metadata)
      FORMAT CSV`,
      data: [values],
      timeout: 5000,
      queryId: 'create-audit-log',
    });
  }

  async getPaginatedAuditLogs(props: QueryAuditLogsArgs): Promise<AuditLogModel[]> {
    this.logger.info(
      'Getting paginated audit logs (limit=%s, offset=%s)',
      props.limit,
      props.offset,
    );

    const limit = props.limit ?? 25; // Default to 25 if limit is undefined
    const sqlLimit = sql.raw(limit.toString());
    const offset = props.offset ?? 0; // Default to 0 if offset is undefined
    const sqlOffset = sql.raw(offset.toString());

    const result = await this.clickHouse.query({
      query: sql`
        SELECT *
        FROM audit_log
        ORDER BY event_time DESC
        LIMIT ${sqlLimit}
        OFFSET ${sqlOffset}
      `,
      queryId: 'get-audit-logs',
      timeout: 5000,
    });

    const model = z.array(auditLogDbObject);
    return model.parse(result.data);
  }

  async getAuditLogsCount(): Promise<number> {
    this.logger.info('Getting audit logs count');

    const result = await this.clickHouse.query({
      query: sql`
      SELECT COUNT(*)
      FROM audit_log
      `,
      queryId: 'get-audit-logs-count',
      timeout: 5000,
    });

    const parsed = auditLogCount.parse(result.data[0]);
    const resultParseInt = parseInt(parsed['COUNT()']);
    return resultParseInt;
  }
}
