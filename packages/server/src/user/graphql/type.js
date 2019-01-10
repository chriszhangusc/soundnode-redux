const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');

const User = new GraphQLObjectType({
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

module.exports = {
  User,
};
