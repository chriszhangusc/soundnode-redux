const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    username: {
      type: GraphQLString,
    },
    full_name: {
      type: GraphQLString,
    },
    avatar_url: {
      type: GraphQLString,
    },
  }),
});

module.exports = UserType;
