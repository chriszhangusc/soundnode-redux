import { createSelector } from 'reselect';

export const getStreamState = state => state.stream;

export const isStreamFetching = createSelector(getStreamState, state => state.fetching);

export const getStreamIds = createSelector(getStreamState, state => state.streamIds);

export const getStreamNextHref = createSelector(getStreamState, state => state.nextHref);
