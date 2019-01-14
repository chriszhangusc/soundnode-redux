import {
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
} from 'graphql';
import * as trackService from '../service';
import { Track, ChartConnection } from './type';

export default {
  track: {
    type: Track,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
    },
    resolve: async (_: any, args: any) => {
      const result = await trackService.getTrackById(args.id);
      return result;
    },
  },
  charts: {
    type: ChartConnection,
    args: {
      genre: {
        type: new GraphQLNonNull(GraphQLString),
        default: 'all-music',
      },
      offset: {
        type: GraphQLInt,
        default: 0,
      },
      limit: {
        type: GraphQLInt,
        default: 25,
      },
    },
    resolve: async (_, args) => {
      const { genre, offset, limit } = args;
      const { charts, hasNext, offsetNext } = await trackService.getCharts(genre, offset, limit);

      return {
        nodes: charts,
        pageInfo: {
          hasNext,
          offsetNext,
        },
      };
    },
  },
};
