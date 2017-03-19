import Artist from './Artist';
import Track from './Track';
import TrackMap from './TrackMap';

export const denormalizeArtist = (normalized) => {
    const artistId = normalized.result;
    const artistRecord = new Artist(normalized.entities.artists[artistId]);
    return artistRecord;
};

/**
 * For a single track response, we need to do two things,
 * extract track and set its user as Artist Record.
 * @param  {[type]} normalized [description]
 * @return {[type]}            [description]
 */
export const denormalizeTrack = (normalized) => {
    // Do we need to verify structure?
    const trackId = normalized.result;
    const track = normalized.entities.tracks[trackId];
    const artistId = track.user;
    const artist = normalized.entities.artists[artistId];
    return new Track(track).set('user', new Artist(artist));
};

/**
 * Take the normalized tracks response and return a TrackMap containing all the tracks.
 * @param  {[type]} normalized [description]
 * @return {[type]}            [description]
 */
export const denormalizeTracks = (normalized) => {
    const {result, entities} = normalized;
    const {tracks, artists} = entities;
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
