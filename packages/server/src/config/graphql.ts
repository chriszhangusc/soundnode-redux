import { ApolloServer } from 'apollo-server-express';
import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import * as track from '@soundnode-redux/server/src/track';
import * as user from '@soundnode-redux/server/src/user';
import * as comment from '@soundnode-redux/server/src/comment';

function getSchema() {
  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {
        ...track.getGraphQLQuery(),
        // ...user.getGraphQLQuery(),
        // ...comment.getGraphQLQuery(),
      },
    }),
    // mutation: new GraphQLObjectType({
    //   name: 'Mutation',
    //   fields: {
    //     ...book.getGraphQLMutation(),
    //   },
    // }),
  });
}

export default function configureGraphQL(app: any) {
  const schema = getSchema();

  const server = new ApolloServer({
    schema,
    // context: {},
  });

  server.applyMiddleware({ app, path: '/graphql' });
}
