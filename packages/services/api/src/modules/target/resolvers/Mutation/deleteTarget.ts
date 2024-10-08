import * as Sentry from '@sentry/node';
import { AuditLogManager } from '../../../audit-logs/providers/audit-logs-manager';
import { AuthManager } from '../../../auth/providers/auth-manager';
import { IdTranslator } from '../../../shared/providers/id-translator';
import { TargetManager } from '../../providers/target-manager';
import type { MutationResolvers } from './../../../../__generated__/types.next';

export const deleteTarget: NonNullable<MutationResolvers['deleteTarget']> = async (
  _,
  { selector },
  { injector },
) => {
  const translator = injector.get(IdTranslator);
  const [organizationId, projectId, targetId] = await Promise.all([
    translator.translateOrganizationId({
      organization: selector.organization,
    }),
    translator.translateProjectId({
      organization: selector.organization,
      project: selector.project,
    }),
    translator.translateTargetId({
      organization: selector.organization,
      project: selector.project,
      target: selector.target,
    }),
  ]);
  const target = await injector.get(TargetManager).deleteTarget({
    organization: organizationId,
    project: projectId,
    target: targetId,
  });

  // Audit Log Event
  try {
    const currentUser = await injector.get(AuthManager).getCurrentUser();
    await injector.get(AuditLogManager).createLogAuditEvent({
      eventType: 'TARGET_DELETED',
      organizationId: target.orgId,
      user: {
        userId: currentUser.id,
        userEmail: currentUser.email,
        user: currentUser,
      },
      targetDeletedAuditLogSchema: {
        projectId: target.projectId,
        targetId: target.id,
        targetName: target.name,
      },
    });
  } catch (error) {
    console.error('Failed to create audit log event', error);
    Sentry.captureException(error, {
      extra: {
        selector,
        deletedTarget: target,
      },
    });
  }

  return {
    selector: {
      organization: organizationId,
      project: projectId,
      target: targetId,
    },
    deletedTarget: target,
  };
};
