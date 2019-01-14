import { GraphQLNonNull, GraphQLInt } from 'graphql';
import * as userService from '../service';
import { User } from './type';

export default {
  user: {
    type: User,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    },
    resolve: (_, args) => {
      const { id } = args;

      return userService.getUserById(id);
    },
  },
};
