import { fetchTrack } from 'client/common/api/sc/v1';
import { TRACK_REQUEST, TRACK_RECEIVE, TRACK_PROFILE_STATE_CLEAR } from './trackProfileConsts';

export const clearTrackState = () => ({
  type: TRACK_PROFILE_STATE_CLEAR,
});

export function requestTrack() {
  return { type: TRACK_REQUEST };
}

export function receiveTrack(normalized) {
  return {
    type: TRACK_RECEIVE,
    payload: normalized,
  };
}

export function loadTrackProfilePage(trackId) {
  return (dispatch) => {
    dispatch(requestTrack());
    fetchTrack(trackId)
      .then((normalized) => {
        dispatch(receiveTrack(normalized));
      })
      .catch((err) => {
        console.log(err);
        // Dispatch failure notification
      });
    // dispatch(requestUserTracks());
    // const [user, userTracks] = await Promise.all([fetchUser(userId), fetchUserTracks(userId)]);
    // throw new Error('Fail to fetch resource.');
    // dispatch(receiveUser(user));
  };
}

// export const fetchComments = trackId => ({
//   [CALL_API]: {
//     endpoint: `/sc/api-v1/tracks/${trackId}/comments`,
//     method: 'GET',
//     query: {
//       limit: 20,
//     },
//     types: [COMMENTS_REQUEST, COMMENTS_RECEIVED, COMMENTS_FAILURE],
//     schema: commentArraySchema,
//   },
// });

// export function commentsRequest() {
//   return {
//     type: COMMENTS_REQUEST,
//   };
// }

// export function commentsReceived(normalizedResponse) {
//   return {
//     type: COMMENTS_RECEIVED,
//     payload: normalizedResponse,
//     entities: normalizedResponse.entities,
//   };
// }

// export function trackRequest() {
//   return {
//     type: TRACK_REQUEST,
//   };
// }

// export function trackReceived(normalizedResponse) {
//   return {
//     type: TRACK_RECEIVED,
//     payload: normalizedResponse,
//     entities: normalizedResponse.entities,
//   };
// }

// // IMPROVE: Got lots of nested then, should have been cleaner
// export function loadTrackPage(trackId) {
//   return (dispatch) => {
//     dispatch(trackRequest());
//     v1.fetchTrack(trackId)
//       .then((trackResponse) => {
//         dispatch(trackReceived(trackResponse));
//       })
//       .then(() => {
//         dispatch(commentsRequest());
//         v1.fetchTrackComments(trackId)
//           .then((commentsResponse) => {
//             dispatch(commentsReceived(commentsResponse));
//           });
//       })
//       .catch((err) => {
//         // Dispatch error notification
//         dispatch(notificationFailure('Failed to load page: ', err));
//       });
//     // dispatch(fetchTrack(trackId));
//     // dispatch(fetchComments(trackId));
//   };
// }

// export function loadMoreComments() {
//   return (dispatch, getState) => {
//     const state = getState();
//     const nextHref = getTrackCommentsNextHref(state);
//     dispatch(commentsRequest());
//     v1.fetchMoreTrackComments(nextHref)
//       .then((commentsResponse) => {
//         dispatch(commentsReceived(commentsResponse));
//       })
//       .catch((err) => {
//         // Dispatch error notification
//         dispatch(notificationFailure('Failed to load comments: ', err));
//       });
//   };
// }
