import { createSelector } from 'reselect';

export const getAuthState = state => state.auth;

export const getMe = createSelector(getAuthState, state => state.me);

export const getMyId = createSelector(getMe, me => me.id);

export const isLoggedIn = createSelector(getMe, me => me !== null);

export const getFavoriteTrackIds = createSelector(getAuthState, state => state.favoriteTracks);
