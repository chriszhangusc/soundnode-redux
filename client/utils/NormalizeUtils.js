import TrackMap from 'client/models/TrackMap';
import Track from 'client/models/Track';
import trackMapper from 'client/models/TrackMapper';
import Artist from 'client/models/Artist';
import ArtistMap from 'client/models/ArtistMap';
import Comment from 'client/models/Comment';
import CommentMap from 'client/models/CommentMap';
/**
 * Take the normalized tracks response and return a TrackMap containing all the tracks.
 * @param  {[type]} normalized [description]
 * @return {[type]}            [description]
 */
export const denormalizeTracks = (normalized) => {
  const { result, entities } = normalized;
  const { tracks, artists } = entities;
  let newTracks = new TrackMap();
  result.forEach((id) => {
    // user is normalized to an id, we need to set it to a ArtistRecord
    const artistId = tracks[id].user;
    const artist = new Artist(artists[artistId]);
    let track = new Track(tracks[id]);
    track = track.set('user', artist);
    newTracks = newTracks.set(id, track);
  });
  return newTracks;
};

/**
 * Take the data coming back from axios, return an OrderedMap containing Track immutable object.
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function normalizeTracks(data) {
  const collection = data.collection;
  let trackMap = new TrackMap();
  collection.forEach((item) => {
    const obj = item.track ? item.track : item;
    trackMap = trackMap.set(obj.id, item.track ? trackMapper(obj) : new Track(obj));
  });
  return {
    trackMap,
    nextHref: data.next_href
  };
}
/**
 * Take response data from api that returns collection
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
// export function normalizeCollections(response, RecordType) {
//   const collection = response.collection;
//   let resultMap = new OrderedMap();
//   collection.forEach((item) => {
//     resultMap = resultMap.set(item.id, new RecordType(item));
//   });
//
//   return {
//     resultMap,
//     nextHref: response.next_href
//   }
// }

export function normalizeArtists(data) {
  const collection = data.collection;
  let artistMap = new ArtistMap();
  collection.forEach((item) => {
    artistMap = artistMap.set(item.id, new Artist(item));
  });

  return {
    artistMap,
    nextHref: data.next_href
  };
}

export function normalizeComments(data) {
  const collection = data.collection;
  let resultMap = new CommentMap();
  collection.forEach((item) => {
    resultMap = resultMap.set(item.id, new Comment(item));
  });

  return {
    resultMap,
    nextHref: data.next_href
  };
}
