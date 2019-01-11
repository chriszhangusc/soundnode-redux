import { GraphQLNonNull, GraphQLInt } from 'graphql';
import { User } from './type';

export default {
  user: {
    type: User,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    },
    resolve(parentValue: any, args: any): any {
      // return axios.get(`${BASE_V1}/users/${args.id}?client_id=${CLIENT_ID}`).then(res => res.data);
      return null;
    },
  },
};
