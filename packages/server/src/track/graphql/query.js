const { GraphQLNonNull, GraphQLID } = require('graphql');
const { getTrackById } = require('../service');
const { Track } = require('./type');

module.exports = {
  track: {
    type: Track,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
    },
    async resolve(parentValue, args) {
      const result = await getTrackById(args.id);

      return result;
    },
  },
};
