import {
  START_ARTIST_FETCH,
  END_ARTIST_FETCH,
  USER_RECEIVED,
  TRACKS_RECEIVED
} from 'client/constants/ActionTypes';
import Artist from 'client/models/Artist';
import { fetchUser, fetchUserTracks } from 'client/services/SCAPIServices';

import { normalizeTracks } from 'client/utils/NormalizeUtils';

export const startFetching = () => ({
  type: START_ARTIST_FETCH
});

export const endFetching = () => ({
  type: END_ARTIST_FETCH
});

export const userReceived = artistRecord => ({
  type: USER_RECEIVED,
  payload: artistRecord
});

export const tracksReceived = normalizedTracks => ({
  type: TRACKS_RECEIVED,
  payload: {
    trackNextHref: normalizedTracks.nextHref,
    tracksById: normalizedTracks.entities,
    trackIds: normalizedTracks.ids
  }
});

/* Thunk actions */
export const loadUser = (uid) => {
  return (dispatch) => {
    dispatch(startFetching());
    Promise.all([
      fetchUser(uid),
      fetchUserTracks(uid)
    ])
    .then(([userRes, tracksRes]) => {
      const artistRecord = new Artist(userRes.data);
      dispatch(userReceived(artistRecord));
      const normalizedTracks = normalizeTracks(tracksRes.data);
      dispatch(tracksReceived(normalizedTracks));
      dispatch(endFetching());
    });
    // .catch((error) => {
    //   console.log('Error in loadUser', error);
    // });
  };
};
