const axios = require('axios');
const { GraphQLNonNull, GraphQLInt } = require('graphql');
const { BASE_V1 } = require('@soundnode-redux/server/src/consts');
const { Track } = require('./type');

module.exports = {
  track: {
    type: Track,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    },
    resolve(parentValue, args) {
      return axios
        .get(`${BASE_V1}/tracks/${args.id}?client_id=${process.env.CLIENT_ID}`)
        .then(res => res.data);
    },
  },
};
