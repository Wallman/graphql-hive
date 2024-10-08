import * as Sentry from '@sentry/node';
import { AuditLogManager } from '../../../audit-logs/providers/audit-logs-manager';
import { AuthManager } from '../../../auth/providers/auth-manager';
import { IdTranslator } from '../../../shared/providers/id-translator';
import { TargetManager } from '../../providers/target-manager';
import type { MutationResolvers } from './../../../../__generated__/types.next';

export const setTargetValidation: NonNullable<MutationResolvers['setTargetValidation']> = async (
  _,
  { input },
  { injector },
) => {
  const translator = injector.get(IdTranslator);
  const [organization, project, target] = await Promise.all([
    translator.translateOrganizationId(input),
    translator.translateProjectId(input),
    translator.translateTargetId(input),
  ]);

  const targetManager = injector.get(TargetManager);
  await targetManager.setTargetValidation({
    organization,
    project,
    target,
    enabled: input.enabled,
  });

  const [result, currentUser] = await Promise.all([
    targetManager.getTarget({
      organization,
      project,
      target,
    }),
    injector.get(AuthManager).getCurrentUser(),
  ]);

  // Audit Log Event
  try {
    await injector.get(AuditLogManager).createLogAuditEvent({
      eventType: 'TARGET_SETTINGS_UPDATED',
      organizationId: organization,
      user: {
        userId: currentUser.id,
        userEmail: currentUser.email,
        user: currentUser,
      },
      targetSettingsUpdatedAuditLogSchema: {
        projectId: project,
        targetId: target,
        updatedFields: JSON.stringify({
          enabled: input.enabled,
          graphqlEndpointUrl: result.graphqlEndpointUrl,
        }),
      },
    });
  } catch (error) {
    console.error('Failed to create audit log event', error);
    Sentry.captureException(error, {
      extra: {
        input,
        result,
      },
    });
  }

  return result;
};
