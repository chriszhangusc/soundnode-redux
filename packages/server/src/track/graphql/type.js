// const _ = require('lodash');
// const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
} = require('graphql');
// const { BASE_V1, CLIENT_ID } = require('@soundnode-redux/server/src/consts');
// const CommentType = require('./comment');
// const UserType = require('./user');

const Track = new GraphQLObjectType({
  name: 'Track',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
    userId: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    title: {
      type: GraphQLString,
    },
    // user: {
    //   type: UserType,

    //   resolve(parentValue) {
    //     return axios
    //       .get(`${BASE_V1}/users/${parentValue.user_id}?client_id=${CLIENT_ID}`)
    //       .then(res => res.data);
    //   },
    // },
    // permalink_url: {
    //   type: GraphQLString,
    // },
    // purchase_url: {
    //   type: GraphQLString,
    // },
    // artwork_url: {
    //   type: GraphQLString,
    // },
    // description: {
    //   type: GraphQLString,
    // },
    // duration: {
    //   type: GraphQLInt,
    // },
    // genre: {
    //   type: GraphQLString,
    // },
    // stream_url: {
    //   type: GraphQLString,
    // },
    // comment_count: {
    //   type: GraphQLInt,
    // },
    // comments: {
    //   type: new GraphQLList(CommentType),

    //   resolve(parentValue) {
    //     return axios
    //       .get(
    //         `${BASE_V1}/tracks/${
    //           parentValue.id
    //         }/comments?limit=20&linked_partitioning=1&offset=0&client_id=${CLIENT_ID}`,
    //       )
    //       .then(resp => _.get(resp, 'data.collection', []));
    //   },
    // },
  }),
});

module.exports = {
  Track,
};
