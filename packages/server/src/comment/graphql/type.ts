import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { createConnectionType } from '../../common/graphql/type';
import { User } from '../../user/graphql/type';

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
    user: {
      type: User,
    },
    trackId: {
      type: GraphQLInt,
    },
  },
});

export const CommentConnection = createConnectionType('CommentConnection', Comment);
