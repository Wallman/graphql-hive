import { createModule } from 'graphql-modules';
import { CollectionProvider } from './providers/collection.provider';
import { resolvers } from './resolvers';
import { typeDefs } from './module.graphql';

export const collectionModule = createModule({
  id: 'preflight-script',
  dirname: __dirname,
  typeDefs,
  resolvers,
  providers: [CollectionProvider],
});
