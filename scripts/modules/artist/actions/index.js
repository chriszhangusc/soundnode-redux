import {
  START_ARTIST_FETCH,
  END_ARTIST_FETCH,
  USER_RECEIVED
} from '../../../constants/ActionTypes';

import { fetchUser, fetchUserTracks } from '../../../services/SCAPIServices';

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

/* Thunk actions */
export const loadUser = (uid) => {
  return (dispatch) => {
    dispatch(startFetching());
    Promise.all([
      fetchUser(uid),
      fetchUserTracks(uid)
    ])
    .then(([user, userTracks]) => {
      dispatch(userReceived(user.data));
      dispatch(endFetching());
    })
    .catch((error) => {
      console.log('Error in loadUser', error);
    });
  };
};
