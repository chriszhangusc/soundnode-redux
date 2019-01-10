import { GraphQLNonNull, GraphQLInt, GraphQLList } from 'graphql';

import { Comment } from './type';

module.exports = {
  comment: {
    type: Comment,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    },
    resolve(parentValue: any, args: any): any {
      // return axios
      //   .get(`${BASE_V1}/comments/${args.id}?client_id=${CLIENT_ID}`)
      //   .then(res => res.data);
      return null;
    },
  },

  comments: {
    type: new GraphQLList(new GraphQLNonNull(Comment)),
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
    resolve(parentValue: any, args: any): any {
      // return axios
      //   .get(
      //     `${BASE_V1}/tracks/${args.trackId}/comments?limit=${
      //       args.limit
      //     }&linked_partitioning=1&offset=${args.offset}&client_id=${CLIENT_ID}`,
      //   )
      //   .then(res => res.data.collection);
      return [];
    },
  },
};
