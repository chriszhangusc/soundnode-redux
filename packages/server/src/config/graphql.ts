import { ApolloServer } from 'apollo-server-express';
import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import * as track from '../track';
import * as user from '../user';
import * as comment from '../comment';

function getSchema() {
  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {
        ...track.getGraphQLQuery(),
        ...user.getGraphQLQuery(),
        ...comment.getGraphQLQuery(),
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
