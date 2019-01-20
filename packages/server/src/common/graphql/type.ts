import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLType,
} from 'graphql';

export const PageInfo = new GraphQLObjectType({
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

export const createConnectionType = (name: string, type: GraphQLType) => {
  return new GraphQLObjectType({
    name,
    fields: {
      nodes: {
        type: new GraphQLList(new GraphQLNonNull(type)),
      },
      pageInfo: {
        type: PageInfo,
      },
    },
  });
};
