import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { createConnectionType } from '@soundnode-redux/server/src/common/graphql/type';

export const Comment = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    id: {
      type: GraphQLInt,
    },
    createdAt: {
      type: GraphQLString,
    },
    body: {
      type: GraphQLString,
    },
    userId: {
      type: GraphQLInt,
    },
    // user: {
    //   type: UserType,

    //   resolve(parentValue) {
    //     // return axios
    //     //   .get(`${BASE_V1}/users/${parentValue.user_id}?client_id=${CLIENT_ID}`)
    //     //   .then(res => res.data);
    //   },
    // },
    trackId: {
      type: GraphQLInt,
    },
  },
});

export const CommentConnection = createConnectionType('CommentConnection', Comment);
