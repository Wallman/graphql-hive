import { gql } from 'graphql-modules';

export const typeDefs = gql`
  type DocumentCollection {
    id: ID!
    source_code: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    createdBy: User!
  }

  input CreateDocumentCollectionInput {
    name: String!
    description: String
  }

  input UpdateDocumentCollectionInput {
    collectionId: ID!
    name: String!
    description: String
  }

  extend type Mutation {
    createDocumentCollection(
      selector: TargetSelectorInput!
      input: CreateDocumentCollectionInput!
    ): ModifyDocumentCollectionResult!
    updateDocumentCollection(
      selector: TargetSelectorInput!
      input: UpdateDocumentCollectionInput!
    ): ModifyDocumentCollectionResult!
  }

  type ModifyDocumentCollectionError implements Error {
    message: String!
  }

  """
  @oneOf
  """
  type DeleteDocumentCollectionResult {
    ok: DeleteDocumentCollectionOkPayload
    error: ModifyDocumentCollectionError
  }

  type DeleteDocumentCollectionOkPayload {
    updatedTarget: Target!
    deletedId: ID!
  }

  """
  @oneOf
  """
  type DeleteDocumentCollectionOperationResult {
    ok: DeleteDocumentCollectionOperationOkPayload
    error: ModifyDocumentCollectionError
  }

  type DeleteDocumentCollectionOperationOkPayload {
    updatedTarget: Target!
    updatedCollection: DocumentCollection!
    deletedId: ID!
  }

  """
  @oneOf
  """
  type ModifyDocumentCollectionResult {
    ok: ModifyDocumentCollectionOkPayload
    error: ModifyDocumentCollectionError
  }

  type ModifyDocumentCollectionOkPayload {
    collection: DocumentCollection!
    updatedTarget: Target!
  }

  """
  @oneOf
  """
  type ModifyDocumentCollectionOperationResult {
    ok: ModifyDocumentCollectionOperationOkPayload
    error: ModifyDocumentCollectionError
  }

  type ModifyDocumentCollectionOperationOkPayload {
    operation: DocumentCollectionOperation!
    collection: DocumentCollection!
    updatedTarget: Target!
  }

  extend type Target {
    documentCollection(id: ID!): DocumentCollection
    documentCollections(first: Int = 100, after: String = null): DocumentCollectionConnection!
    documentCollectionOperation(id: ID!): DocumentCollectionOperation
  }
`;
