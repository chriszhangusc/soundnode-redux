const { GraphQLNonNull, GraphQLInt } = require('graphql');
const { User } = require('./type');

module.exports = {
  user: {
    type: User,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    },
    resolve(parentValue, args) {
      // return axios.get(`${BASE_V1}/users/${args.id}?client_id=${CLIENT_ID}`).then(res => res.data);
      return null;
    },
  },
};
