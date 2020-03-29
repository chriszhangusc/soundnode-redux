import { isNumber } from 'lodash';
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';
import { User } from '../../user/graphql/type';
import { createConnectionType } from '../../common/graphql/type';

export const Track = new GraphQLObjectType({
  name: 'Track',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
    title: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    streamable: {
      type: GraphQLBoolean,
    },
    artworkUrl: {
      type: GraphQLString,
    },
    permalinkUrl: {
      type: GraphQLString,
    },
    user: {
      type: new GraphQLNonNull(User),
    },
    duration: {
      type: GraphQLInt,
    },
    genre: {
      type: GraphQLString,
    },
    streamUrl: {
      type: GraphQLString,
    },
    playbackCount: {
      type: GraphQLInt,
    },
    likesCount: {
      type: GraphQLInt,
      resolve: parent => {
        if (isNumber(parent.likesCount)) {
          return parent.likesCount;
        }

        if (isNumber(parent.favoritingsCount)) {
          return parent.favoritingsCount;
        }

        return null;
      },
    },
    commentCount: {
      type: GraphQLInt,
    },
  }),
});

export const ChartConnection = createConnectionType('ChartConnection', Track);
