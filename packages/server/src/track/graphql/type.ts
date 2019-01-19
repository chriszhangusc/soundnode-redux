import { isNumber } from 'lodash';
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql';
import { User } from '@soundnode-redux/server/src/user/graphql/type';

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

const PageInfo = new GraphQLObjectType({
  name: 'PageInfo',
  fields: {
    offsetNext: {
      type: GraphQLInt,
    },
    hasNext: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  },
});

export const ChartConnection = new GraphQLObjectType({
  name: 'ChartConnection',
  fields: {
    nodes: {
      type: new GraphQLList(Track),
    },
    pageInfo: {
      type: PageInfo,
    },
  },
});
