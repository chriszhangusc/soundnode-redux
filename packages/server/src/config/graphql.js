const { ApolloServer } = require('apollo-server-express');
const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const track = require('@soundnode-redux/server/src/track');

function getSchema() {
  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {
        ...track.getGraphQLQuery(),
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

function configureGraphQL(app) {
  const schema = getSchema();

  const server = new ApolloServer({
    schema,
    // context: {},
  });

  server.applyMiddleware({ app, path: '/graphql' });
}

module.exports = configureGraphQL;
