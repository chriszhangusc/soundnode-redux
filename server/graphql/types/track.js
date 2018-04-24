const axios = require('axios');
const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');
const UserType = require('./user');
const { BASE_V1, CLIENT_ID } = require('../consts');

const TrackType = new GraphQLObjectType({
  name: 'Track',
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    created_at: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    user_id: {
      type: GraphQLInt,
    },
    user: {
      type: UserType,

      resolve(parentValue) {
        console.log(parentValue.user_id);
        return axios
          .get(`${BASE_V1}/users/${parentValue.user_id}?client_id=${CLIENT_ID}`)
          .then(res => res.data);
      },
    },
  }),
});

module.exports = TrackType;
