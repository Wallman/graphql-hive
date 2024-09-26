import { Injectable, Scope } from 'graphql-modules';
import { AuthManager } from '../../auth/providers/auth-manager';
import { Logger } from '../../shared/providers/logger';
import { Storage } from '../../shared/providers/storage';
import type { CollectionModule } from './../__generated__/types';

@Injectable({
  global: true,
  scope: Scope.Operation,
})
export class PreflightScriptProvider {
  private logger: Logger;

  constructor(
    logger: Logger,
    private storage: Storage,
    private authManager: AuthManager,
  ) {
    this.logger = logger.child({ source: 'PreflightScriptProvider' });
  }

  getCollection(id: string) {
    return this.storage.getDocumentCollection({ id });
  }

  async createCollection(
    targetId: string,
    {
      name,
      description,
    }: Pick<CollectionModule.CreateDocumentCollectionInput, 'description' | 'name'>,
  ) {
    const currentUser = await this.authManager.getCurrentUser();

    return this.storage.createDocumentCollection({
      createdByUserId: currentUser.id,
      title: name,
      description: description || '',
      targetId,
    });
  }

  updateCollection(input: CollectionModule.UpdateDocumentCollectionInput) {
    return this.storage.updateDocumentCollection({
      documentCollectionId: input.collectionId,
      description: input.description || null,
      title: input.name,
    });
  }
}
