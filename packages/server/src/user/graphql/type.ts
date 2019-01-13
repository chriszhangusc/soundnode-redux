import {
  GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull,
} from 'graphql';

export const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
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
