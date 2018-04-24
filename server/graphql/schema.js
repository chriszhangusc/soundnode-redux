const axios = require('axios');
const {
  GraphQLObjectType, GraphQLSchema, GraphQLNonNull, GraphQLInt,
} = require('graphql');
const { BASE_V1, CLIENT_ID } = require('./consts');

const TrackType = require('./types/track');
const UserType = require('./types/user');

const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    track: {
      type: TrackType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve(parentValue, args) {
        return axios
          .get(`${BASE_V1}/tracks/${args.id}?client_id=${CLIENT_ID}`)
          .then(res => res.data);
      },
    },

    user: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve(parentValue, args) {
        return axios
          .get(`${BASE_V1}/users/${args.id}?client_id=${CLIENT_ID}`)
          .then(res => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: rootQuery,
});
