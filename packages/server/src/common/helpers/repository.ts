import url from 'url';

type CollectionResult = {
  collection: Array<object>;
  nextHref: string;
};

type CollectionMapper = (collection) => Array<object>;

export function getPaginatedResult(result: CollectionResult, collectionMapper?: CollectionMapper) {
  const { collection = [], nextHref } = result;

  let query;

  if (nextHref) {
    query = url.parse(nextHref, true).query;
  }

  return {
    nodes: collectionMapper ? collection.map(collectionMapper) : collection,
    pageInfo: {
      hasNext: !!nextHref,
      offsetNext: query && Number(query.offset),
    },
  };
}
