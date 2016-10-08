import {
  START_ARTIST_FETCH,
  END_ARTIST_FETCH,
  USER_RECEIVED,
  TRACKS_RECEIVED
} from 'client/constants/ActionTypes';

import { fetchUser, fetchUserTracks } from 'client/services/SCAPIServices';

import { normalizeTracks } from 'client/utils/NormalizeUtils';

export const startFetching = () => ({
  type: START_ARTIST_FETCH
});

export const endFetching = () => ({
  type: END_ARTIST_FETCH
});

export const userReceived = user => ({
  type: USER_RECEIVED,
  payload: {
    avatarUrl: user.avatar_url,
    name: user.username,
    followers: user.followers_count,
    description: user.description
  }
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
    .then(([user, tracks]) => {
      dispatch(userReceived(user.data));
      const normalizedTracks = normalizeTracks(tracks.data);
      dispatch(tracksReceived(normalizedTracks));
      dispatch(endFetching());
    });
    // .catch((error) => {
    //   console.log('Error in loadUser', error);
    // });
  };
};
