import { AuditLogManager } from '../../../audit-logs/providers/audit-logs-manager';
import { AuthManager } from '../../../auth/providers/auth-manager';
import { IdTranslator } from '../../../shared/providers/id-translator';
import { TargetManager } from '../../providers/target-manager';
import type { MutationResolvers } from './../../../../__generated__/types.next';

export const experimental__updateTargetSchemaComposition: NonNullable<
  MutationResolvers['experimental__updateTargetSchemaComposition']
> = async (_, { input }, { injector }) => {
  const translator = injector.get(IdTranslator);
  const [organizationId, projectId, targetId] = await Promise.all([
    translator.translateOrganizationId(input),
    translator.translateProjectId(input),
    translator.translateTargetId(input),
  ]);

  const result = await injector.get(TargetManager).updateTargetSchemaComposition({
    organizationId,
    projectId,
    targetId,
    nativeComposition: input.nativeComposition,
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
          nativeComposition: input.nativeComposition,
        }),
      },
    });
  } catch (error) {
    console.error('Failed to create audit log event', error);
  }

  return result;
};
