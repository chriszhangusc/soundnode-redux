import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

export const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    username: {
      type: GraphQLString,
    },
    fullName: {
      type: GraphQLString,
    },
    avatarUrl: {
      type: GraphQLString,
    },
  }),
});
