import { createModule } from 'graphql-modules';
import { PreflightScriptProvider } from './providers/preflight-script.provider';
import { resolvers } from './resolvers';
import { typeDefs } from './module.graphql';

export const collectionModule = createModule({
  id: 'preflight-script',
  dirname: __dirname,
  typeDefs,
  resolvers,
  providers: [PreflightScriptProvider],
});
