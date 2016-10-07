// Normalize data from the server.

export function normalizeTracks(data) {
  // { [trackIds] {tracks obj array} }
  const collection = data.collection;
  const ids = [];
  const entities = {};
  collection.forEach((item) => {
    const obj = item.track ? item.track : item;
    const id = obj.id;
    ids.push(id);
    entities[id] = obj;
  });

  return {
    ids,
    entities,
    nextHref: data.next_href
  };
}

export function normalizeSearchResults(data) {
  const collection = data.collection;
  const ids = [];
  const entities = {};
  collection.forEach((item) => {
    ids.push(item.id);
    entities[item.id] = item;
  });
  return {
    ids,
    entities,
    nextHref: data.next_href
  };
}
