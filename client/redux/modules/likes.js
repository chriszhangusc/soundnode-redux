// import { fromJS } from 'immutable';
// import { firebaseRef } from 'client/firebase';
// import { CALL_API } from 'client/redux/middlewares/apiMiddleware';
// import { trackArraySchema } from 'client/schemas';
//
// import {
//   LIKE_SONG_SUCCESS,
//   LIKE_SONG_FAILED,
//   LOAD_ALL_LIKES,
//   UNLIKE_SONG_SUCCESS,
//   LIKED_TRACKS_REQUEST,
//   LIKED_TRACKS_RECEIVE,
//   LIKED_TRACKS_FAILURE
// } from 'client/constants/ActionTypes';
//
// import {
//   getUserLikes,
//   getUserId,
//   getUserLikeIds
// } from './reducers';
//
// const LIKE_SUCCESS = L
// LIKE_SONG_FAILED,
// LOAD_ALL_LIKES,
// UNLIKE_SONG_SUCCESS,
// LIKED_TRACKS_REQUEST,
// LIKED_TRACKS_RECEIVE,
// LIKED_TRACKS_FAILURE
//
// const INITIAL_STATE = fromJS({
//   likesFetching: false,
//   likes: {} // Map from trackId: firebaseKey to get easier access to firebaseKey
//   // No need to save likes id
// });
//
// export const loadAllLikes = likes => ({
//   type: LOAD_ALL_LIKES,
//   payload: likes
// });
//
// /**
//  * Fetch all likes of current user from firebase
//  * @return thunk
//  */
// export const startLoadAllLikes = () => (dispatch, getState) => {
//   const state = getState();
//   const uid = getUserId(state);
//   const likesRef = firebaseRef.child(`${uid}/likes`);
//   const likes = {};
//   likesRef.once('value', (snapshot) => {
//     snapshot.forEach((childSnapshot) => {
//       const songId = childSnapshot.val();
//       likes[String(songId)] = childSnapshot.key;
//     });
//   }).then(() => {
//     dispatch(loadAllLikes(likes));
//   }, (err) => {
//     console.log('Load All Likes Error: ', err);
//   });
// };
//
// // This should be grouped in api folder.
// export const fetchLikedTracks = trackIds => ({
//   [CALL_API]: {
//     endpoint: '/sc/api-v1/tracks',
//     fetchOptions: {
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       method: 'POST',
//       body: JSON.stringify({
//         trackIds: [...trackIds]
//       })
//     },
//     types: [LIKED_TRACKS_REQUEST, LIKED_TRACKS_RECEIVE, LIKED_TRACKS_FAILURE],
//     schema: trackArraySchema
//   }
// });
//
// /**
//  * Fetch the actual liked track objects
//  * @return {[type]} [description]
//  */
// export const fetchAllLikedTracks = () => (dispatch, getState) => {
//   const state = getState();
//   const trackIds = getUserLikeIds(state);
//   dispatch(fetchTracks(trackIds.toJS()));
// };
//
//
// // record is an object where { songId:Firebase Key }
// export const likeSongSuccess = record => ({
//   type: LIKE_SONG_SUCCESS,
//   payload: {
//     record,
//     message: 'Song added to likes'
//   }
// });
//
// export const likeSongFailed = songId => ({
//   type: LIKE_SONG_FAILED,
//   payload: {
//     songId,
//     message: 'Failed to add song to likes'
//   }
// });
//
// export function startLikeSong(songId) {
//   return (dispatch, getState) => {
//     const state = getState();
//     const uid = getUserId(state);
//     // If not logged in, display a message to tell the user to login first.
//     if (!uid) {
//       // Trigger notification!!!!
//       console.log('You have to login first.');
//       return;
//     }
//     firebaseRef.child(`${uid}/likes`).push(songId).then((ret) => {
//       const record = {
//         songId,
//         firebaseKey: ret.key
//       };
//       dispatch(likeSongSuccess(record));
//     }, (err) => {
//       if (err) console.log('Push fail', err);
//     });
//   };
// }
//
// export function unlikeSongSuccess(songId) {
//   return {
//     type: UNLIKE_SONG_SUCCESS,
//     payload: {
//       songId,
//       message: 'Song removed from likes'
//     }
//   };
// }
//
// export function startUnlikeSong(songId) {
//   return (dispatch, getState) => {
//     const state = getState();
//     const uid = getUserId(state);
//     // If not logged in, display a message to tell the user to login first.
//     if (!uid) {
//       // Trigger notification!!!!
//       console.log('You have to login first.');
//       return;
//     }
//     const likes = getUserLikes(state);
//     const firebaseKey = likes[songId];
//     firebaseRef.child(`${uid}/likes/${firebaseKey}`).remove((ret) => {
//       console.log(ret);
//       dispatch(unlikeSongSuccess(songId));
//     });
//   };
// }
//
//
//
// const likes = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case LOAD_ALL_LIKES:
//       return state.set('likes', fromJS(action.payload));
//     case LIKE_SONG_SUCCESS:
//       return state.setIn(
//         ['likes', action.payload.record.songId.toString()],
//         action.payload.record.firebaseKey
//       );
//     case UNLIKE_SONG_SUCCESS:
//       // It will fail without toString!!!
//       return state.deleteIn(['likes', action.payload.songId.toString()]);
//     case LIKE_SONG_FAILED:
//     default:
//       return state;
//   }
// };
//
// export const getLikes = state => state.get('likes');
// export const getLikeIds = state => fromJS(state.get('likes').keys());
// export const isFetching = state => state.get('fetching');
//
// export default likes;