import TrackMap from 'client/models/TrackMap';
import Track from 'client/models/Track';
import trackMapper from 'client/models/TrackMapper';
import Artist from 'client/models/Artist';
import ArtistMap from 'client/models/ArtistMap';
import Comment from 'client/models/Comment';
import CommentMap from 'client/models/CommentMap';
import {camelizeKeys} from 'humps';

/**
 * Take the data coming back from axios, return an OrderedMap containing Track immutable object.
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */

// To be merged into general normalize function
export function normalizeTracks(data) {
    const collection = camelizeKeys(data.collection);
    let trackMap = new TrackMap();
    collection.forEach((item) => {
        const obj = item.track
            ? item.track
            : item;
        trackMap = trackMap.set(obj.id, item.track
            ? trackMapper(obj)
            : new Track(obj));
    });
    return {trackMap, nextHref: data.next_href};
}

export function normalizeArtists(data) {

    const resultMap = normalize(data, ArtistMap, Artist);
    return {artistMap: resultMap, nextHref: data.next_href};
}

export function normalizeComments(data) {

    const resultMap = normalize(data, CommentMap, Comment);
    return {commentMap: resultMap, nextHref: data.next_href};
}

function normalize(data, MapType, Model) {
    const collection = camelizeKeys(data.collection);
    let resultMap = new MapType();
    collection.forEach((item) => {
        resultMap = resultMap.set(item.id, new Model(item));
    });
    return resultMap;
}
