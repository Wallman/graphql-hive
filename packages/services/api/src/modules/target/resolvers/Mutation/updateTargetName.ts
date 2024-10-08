import { z } from 'zod';
import * as Sentry from '@sentry/node';
import { AuditLogManager } from '../../../audit-logs/providers/audit-logs-manager';
import { AuthManager } from '../../../auth/providers/auth-manager';
import { IdTranslator } from '../../../shared/providers/id-translator';
import { TargetManager } from '../../providers/target-manager';
import { TargetNameModel } from '../../validation';
import type { MutationResolvers } from './../../../../__generated__/types.next';

export const updateTargetName: NonNullable<MutationResolvers['updateTargetName']> = async (
  _,
  { input },
  { injector },
) => {
  const UpdateTargetModel = z.object({
    name: TargetNameModel,
  });

  const result = UpdateTargetModel.safeParse(input);
  if (!result.success) {
    return {
      error: {
        message: 'Check your input.',
        inputErrors: {
          name: result.error.formErrors.fieldErrors.name?.[0],
        },
      },
    };
  }

  const translator = injector.get(IdTranslator);
  const [organizationId, projectId, targetId] = await Promise.all([
    translator.translateOrganizationId({
      organization: input.organization,
    }),
    translator.translateProjectId({
      organization: input.organization,
      project: input.project,
    }),
    translator.translateTargetId({
      organization: input.organization,
      project: input.project,
      target: input.target,
    }),
  ]);

  const target = await injector.get(TargetManager).updateName({
    name: input.name,
    organization: organizationId,
    project: projectId,
    target: targetId,
  });

  // Audit Log Event
  try {
    const currentUser = await injector.get(AuthManager).getCurrentUser();
    await injector.get(AuditLogManager).createLogAuditEvent({
      eventType: 'TARGET_SETTINGS_UPDATED',
      organizationId: organizationId,
      user: {
        userId: currentUser.id,
        userEmail: currentUser.email,
        user: currentUser,
      },
      targetSettingsUpdatedAuditLogSchema: {
        projectId: projectId,
        targetId: targetId,
        updatedFields: JSON.stringify({
          name: input.name,
        }),
      },
    });
  } catch (error) {
    console.error('Failed to create audit log event', error);
    Sentry.captureException(error, {
      extra: {
        input,
        organizationId,
        projectId,
        targetId,
      },
    });
  }

  return {
    ok: {
      selector: {
        organization: input.organization,
        project: input.project,
        target: target.cleanId,
      },
      updatedTarget: target,
    },
  };
};
