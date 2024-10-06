import { gql } from 'graphql-modules';

export const typeDefs = gql`
  scalar DateTime
  interface AuditLog {
    id: ID!
    eventTime: DateTime!
    user: AuditLogUserRecord!
    organizationId: String!
  }

  type AuditLogUserRecord {
    userId: ID!
    userEmail: String!
    user: User # this one is nullable because it can be deleted!
  }

  type AuditLogConnection {
    nodes: [AuditLog]!
    total: Int!
  }

  type AuditLogFileExport {
    id: ID!
    url: String!
    validUntil: DateTime!
    createdAt: DateTime!
  }

  type ExportResultEdge {
    node: AuditLogFileExport!
    cursor: String!
  }

  type ExportResultConnection {
    edges: [ExportResultEdge!]!
    pageInfo: PageInfo!
  }

  input AuditLogFilter {
    date: DateTime
    userId: String
    organizationId: String
    eventType: String
  }

  extend type Query {
    auditLogs(filter: AuditLogFilter, limit: Int, offset: Int): AuditLogConnection!
    auditLogExports(limit: Int, offset: Int, filter: AuditLogFilter): ExportResultConnection!
  }

  extend type Mutation {
    exportAuditLogsToFile(filter: AuditLogFilter!): AuditLogFileExport!
  }

  type ModifyAuditLogError implements Error {
    message: String!
  }

  type UserInvitedAuditLog implements AuditLog {
    id: ID!
    eventTime: DateTime!
    user: AuditLogUserRecord!
    organizationId: String!
    inviteeId: String!
    inviteeEmail: String!
  }

  type UserJoinedAuditLog implements AuditLog {
    id: ID!
    eventTime: DateTime!
    user: AuditLogUserRecord!
    organizationId: String!
    inviteeId: String!
    inviteeEmail: String!
  }
  type UserRemovedAuditLog implements AuditLog {
    id: ID!
    eventTime: DateTime!
    user: AuditLogUserRecord!
    organizationId: String!
    removedUserId: String!
    removedUserEmail: String!
  }

  type OrganizationSettingsUpdatedAuditLog implements AuditLog {
    id: ID!
    eventTime: DateTime!
    user: AuditLogUserRecord!
    organizationId: String!
    updatedFields: JSON!
  }

  type OrganizationTransferredAuditLog implements AuditLog {
    id: ID!
    eventTime: DateTime!
    user: AuditLogUserRecord!
    organizationId: String!
    newOwnerId: String!
    newOwnerEmail: String!
  }

  type ProjectCreatedAuditLog implements AuditLog {
    id: ID!
    eventTime: DateTime!
    user: AuditLogUserRecord!
    organizationId: String!
    projectId: String!
    projectName: String!
  }

  type ProjectSettingsUpdatedAuditLog implements AuditLog {
    id: ID!
    eventTime: DateTime!
    user: AuditLogUserRecord!
    organizationId: String!
    projectId: String!
    updatedFields: JSON!
  }

  type ProjectDeletedAuditLog implements AuditLog {
    id: ID!
    eventTime: DateTime!
    user: AuditLogUserRecord!
    organizationId: String!
    projectId: String!
    projectName: String!
  }

  type TargetCreatedAuditLog implements AuditLog {
    id: ID!
    eventTime: DateTime!
    user: AuditLogUserRecord!
    organizationId: String!
    projectId: String!
    targetId: String!
    targetName: String!
  }

  type TargetSettingsUpdatedAuditLog implements AuditLog {
    id: ID!
    eventTime: DateTime!
    user: AuditLogUserRecord!
    organizationId: String!
    projectId: String!
    targetId: String!
    updatedFields: JSON!
  }

  type TargetDeletedAuditLog implements AuditLog {
    id: ID!
    eventTime: DateTime!
    user: AuditLogUserRecord!
    organizationId: String!
    projectId: String!
    targetId: String!
    targetName: String!
  }

  type SchemaPolicySettingsUpdatedAuditLog implements AuditLog {
    id: ID!
    eventTime: DateTime!
    user: AuditLogUserRecord!
    organizationId: String!
    projectId: String!
    updatedFields: JSON!
  }

  type SchemaCheckedAuditLog implements AuditLog {
    id: ID!
    eventTime: DateTime!
    user: AuditLogUserRecord!
    organizationId: String!
    projectId: String!
    targetId: String!
    schemaSdl: String!
  }

  type SchemaPublishAuditLog implements AuditLog {
    id: ID!
    eventTime: DateTime!
    user: AuditLogUserRecord!
    organizationId: String!
    projectId: String!
    targetId: String!
    schemaName: String!
  }

  type SchemaDeletedAuditLog implements AuditLog {
    id: ID!
    eventTime: DateTime!
    user: AuditLogUserRecord!
    organizationId: String!
    projectId: String!
    targetId: String!
    schemaName: String!
  }

  type RoleCreatedAuditLog implements AuditLog {
    id: ID!
    eventTime: DateTime!
    user: AuditLogUserRecord!
    organizationId: String!
    roleId: String!
    roleName: String!
  }

  type RoleAssignedAuditLog implements AuditLog {
    id: ID!
    eventTime: DateTime!
    user: AuditLogUserRecord!
    organizationId: String!
    roleId: String!
    roleName: String!
    userIdAssigned: String!
    userEmailAssigned: String!
  }

  type RoleDeletedAuditLog implements AuditLog {
    id: ID!
    eventTime: DateTime!
    user: AuditLogUserRecord!
    organizationId: String!
    roleId: String!
    roleName: String!
  }

  type RoleUpdatedAuditLog implements AuditLog {
    id: ID!
    eventTime: DateTime!
    user: AuditLogUserRecord!
    organizationId: String!
    roleId: String!
    roleName: String!
    updatedFields: JSON!
  }
`;
