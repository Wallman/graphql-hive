import { gql } from 'graphql-modules';

export const typeDefs = gql`
  type PreflightScript {
    id: ID!
    sourceCode: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    createdBy: User!
  }

  input CreatePreflightScriptInput {
    sourceCode: String!
  }

  input UpdatePreflightScriptInput {
    id: ID!
    sourceCode: String!
  }

  extend type Mutation {
    createPreflightScript(
      selector: TargetSelectorInput!
      input: CreatePreflightScriptInput!
    ): ModifyPreflightScriptResult!
    updatePreflightScript(
      selector: TargetSelectorInput!
      input: UpdatePreflightScriptInput!
    ): ModifyPreflightScriptResult!
  }

  type ModifyPreflightScriptError implements Error {
    message: String!
  }

  """
  @oneOf
  """
  type ModifyPreflightScriptResult {
    ok: ModifyPreflightScriptOkPayload
    error: ModifyDocumentCollectionError
  }

  type ModifyPreflightScriptOkPayload {
    preflightScript: PreflightScript!
    updatedTarget: Target!
  }

  extend type Target {
    preflightScript(id: ID!): PreflightScript
  }
`;
