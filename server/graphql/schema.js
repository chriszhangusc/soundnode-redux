const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList,
} = require('graphql');
const { BASE_V1, CLIENT_ID } = require('./consts');

const TrackType = require('./types/track');
const UserType = require('./types/user');
const CommentType = require('./types/comment');

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

    comment: {
      type: CommentType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve(parentValue, args) {
        return axios
          .get(`${BASE_V1}/comments/${args.id}?client_id=${CLIENT_ID}`)
          .then(res => res.data);
      },
    },

    comments: {
      type: new GraphQLList(CommentType),
      args: {
        trackId: {
          type: new GraphQLNonNull(GraphQLInt),
        },
        offset: {
          type: GraphQLInt,
          defaultValue: 0,
        },
        limit: {
          type: GraphQLInt,
          defaultValue: 20,
        },
      },
      resolve(parentValue, args) {
        return axios
          .get(
            `${BASE_V1}/tracks/${args.trackId}/comments?limit=${
              args.limit
            }&linked_partitioning=1&offset=${args.offset}&client_id=${CLIENT_ID}`,
          )
          .then(res => res.data.collection);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: rootQuery,
});
