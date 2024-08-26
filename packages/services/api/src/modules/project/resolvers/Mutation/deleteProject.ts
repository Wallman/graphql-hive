import { AuditLogManager } from '../../../audit-logs/providers/audit-logs-manager';
import { AuthManager } from '../../../auth/providers/auth-manager';
import { IdTranslator } from '../../../shared/providers/id-translator';
import { ProjectManager } from '../../providers/project-manager';
import type { MutationResolvers } from './../../../../__generated__/types.next';

export const deleteProject: NonNullable<MutationResolvers['deleteProject']> = async (
  _,
  { selector },
  { injector },
) => {
  const translator = injector.get(IdTranslator);
  const [organizationId, projectId] = await Promise.all([
    translator.translateOrganizationId({
      organization: selector.organization,
    }),
    translator.translateProjectId({
      organization: selector.organization,
      project: selector.project,
    }),
  ]);
  const deletedProject = await injector.get(ProjectManager).deleteProject({
    organization: organizationId,
    project: projectId,
  });

  // Audit Log Event
  try {
    const currentUser = await injector.get(AuthManager).getCurrentUser();
    await injector.get(AuditLogManager).createLogAuditEvent({
      eventType: 'PROJECT_DELETED',
      organizationId: organizationId,
      user: {
        userId: currentUser.id,
        userEmail: currentUser.email,
        user: currentUser,
      },
      projectDeletedAuditLogSchema: {
        projectId: projectId,
        projectName: deletedProject.name,
      },
    });
  } catch (error) {
    console.error('Failed to create audit log event', error);
  }

  return {
    selector: {
      organization: organizationId,
      project: projectId,
    },
    deletedProject,
  };
};
