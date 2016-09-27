// Normalize data from the server.

export function normalizeCharts(data) {
  // { [trackIds] {tracks obj array} }
  const collection = data.collection
  const ids = [];
  const entities = {};
  collection.forEach((item) => {
    const obj = item.track;
    const id = obj.id;
    ids.push(id);
    entities[id] = obj;
  });

  return {
    ids,
    entities,
    next_href: data.next_href
  };
}
