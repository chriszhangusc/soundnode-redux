import { fetchUsers, fetchTracks } from '../../../services/SCAPIServices';
import {
  START_SEARCH,
  END_SEARCH,
  SEARCH_USERS_RECEIVED,
  SEARCH_TRACKS_RECEIVED,
  SHOW_SEARCH_RESULTS,
  HIDE_SEARCH_RESULTS,
  CLEAR_SEARCH_RESULTS
} from '../../../constants/ActionTypes';
import { normalizeSearchResults } from '../../../utils/NormalizeUtils';

function startSearch() {
  return {
    type: START_SEARCH
  };
}

function endSearch() {
  return {
    type: END_SEARCH
  };
}

function tracksReceived(normalizedTracks) {
  return {
    type: SEARCH_TRACKS_RECEIVED,
    payload: {
      tracksById: normalizedTracks.entities,
      trackIds: normalizedTracks.ids,
      trackNextHref: normalizedTracks.nextHref
    }
  };
}

function usersReceived(normalizedUsers) {
  return {
    type: SEARCH_USERS_RECEIVED,
    payload: {
      usersById: normalizedUsers.entities,
      userIds: normalizedUsers.ids,
      userNextHref: normalizedUsers.nextHref
    }
  };
}

export function hideSearchResults() {
  return {
    type: HIDE_SEARCH_RESULTS
  };
}

export function showSearchResults() {
  return {
    type: SHOW_SEARCH_RESULTS
  };
}

export function clearSearchResults() {
  return {
    type: CLEAR_SEARCH_RESULTS
  };
}

/* Thunk Actions */

export function clearAndHideSearchResults() {
  return (dispatch) => {
    dispatch(hideSearchResults());
    dispatch(clearSearchResults());
  };
}

export function doSearch(keyword) {
  return (dispatch) => {
    // Show dropdown with fetching sign.
    dispatch(startSearch());
    Promise.all([
      fetchUsers(keyword),
      fetchTracks(keyword)
    ])
    .then(([userRes, trackRes]) => {
      const normalizedUsers = normalizeSearchResults(userRes.data);
      const normalizedTracks = normalizeSearchResults(trackRes.data);
      dispatch(usersReceived(normalizedUsers));
      dispatch(tracksReceived(normalizedTracks));
      dispatch(endSearch());
      dispatch(showSearchResults());
    })
    .catch((err) => {
      console.log('Error occurs in doSearch:', err);
    });
  };
}
