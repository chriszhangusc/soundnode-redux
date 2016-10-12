import TrackMap from 'client/models/TrackMap';
import Track from 'client/models/Track';
import trackMapper from 'client/models/TrackMapper';
import Artist from 'client/models/Artist';
import ArtistMap from 'client/models/ArtistMap';

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
    // if (obj.user) artistMap = artistMap.set(obj.user.id, new Artist(obj.user));
  });
  return {
    trackMap,
    nextHref: data.next_href
  };
}

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
