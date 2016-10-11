import TrackMap from 'client/models/TrackMap';
import Track from 'client/models/Track';
import trackMapper from 'client/models/TrackMapper';
// Normalize data from the server.
// The byIds and ids way
// export function normalizeTracks(data) {
//   // { [trackIds] {tracks obj array} }
//   const collection = data.collection;
//   const ids = [];
//   const entities = {};
//   collection.forEach((item) => {
//     const obj = item.track ? item.track : item;
//     const id = obj.id;
//     ids.push(id);
//     entities[id] = obj;
//   });
//
//   return {
//     ids,
//     entities,
//     nextHref: data.next_href
//   };
// }


export function normalizeTracks(data) {
  const collection = data.collection;
  let trackMap = new TrackMap();
  collection.forEach((item) => {
    const obj = item.track ? item.track : item;
    trackMap = trackMap.set(obj.id, item.track ? trackMapper(obj) : new Track(obj));
    // if (obj.user) artistMap = artistMap.set(obj.user.id, new Artist(obj.user));
  });
  return {
    trackMap,
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
