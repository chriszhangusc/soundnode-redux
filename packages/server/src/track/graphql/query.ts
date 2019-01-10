import { GraphQLNonNull, GraphQLID } from 'graphql';
import { getTrackById } from '../service';
import { Track } from './type';

export default {
  track: {
    type: Track,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
    },
    async resolve(parentValue: any, args: any) {
      const result = await getTrackById(args.id);

      return result;
    },
  },
};
