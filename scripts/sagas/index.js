// import { fork, take, put, call, select } from 'redux-saga/effects';
// import * as ActionTypes from '../constants/ActionTypes';
// import { generateFetchUrl } from '../utils/SongUtils';
// import axios from 'axios';
// import { normalize } from 'normalizr';
// import { arrayOfSongs } from '../actions/schema';
// import { receiveSongs } from '../actions/playlists';
//
// import { getPlaylists } from '../reducers';
//
// export function* helloSaga() {
//   console.log('Hallo Saga!');
//   yield 'hello';
// }
//
// function doSomething(something) {
//   console.log('something: ', something);
// }
//
// function* watchInitialLoadSongs() {
//   while (true) {
//     // Creates an Effect description that instructs the middleware to wait for
//     //a specified action on the Store. The Generator is suspended until an action
//     // that matches pattern is dispatched.
//     const {playlist} = yield take(ActionTypes.REQUEST_INITIAL_SONGS);
//     // Fetch is requested playlist is not yet cached
//     const playlists = yield select(getPlaylists);
//     console.log(playlist, playlists);
//     if (!(playlist in playlists)) {
//       const url = yield call(generateFetchUrl, playlist);
//       const response = yield call(axios.get, url);
//       const normalizedSongs = normalize(response.data.collection, arrayOfSongs);
//       yield put(
//         receiveSongs(
//           playlist,
//           normalizedSongs.entities.songs,
//           normalizedSongs.result,
//           response.data.next_href)
//       );
//     }
//   }
// }
//
// export default function* rootSaga() {
//   yield [
//     fork(watchInitialLoadSongs)
//   ]
// }
