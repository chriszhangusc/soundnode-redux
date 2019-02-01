import { GraphQLNonNull, GraphQLInt, GraphQLList } from 'graphql';
import * as commentService from '../service';
import { Comment, CommentConnection } from './type';

export default {
  comment: {
    type: Comment,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    },
    resolve: (parentValue: any, args: any) => {
      // return axios
      //   .get(`${BASE_V1}/comments/${args.id}?client_id=${CLIENT_ID}`)
      //   .then(res => res.data);
      return null;
    },
  },

  trackComments: {
    type: CommentConnection,
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
    resolve: async (_, args) => {
      const { trackId, offset, limit } = args;
      const result = await commentService.getCommentsByTrackId(trackId, offset, limit);

      return result;
    },
  },

  // userComments
};
