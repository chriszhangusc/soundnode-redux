import { createSelector } from 'reselect';

export const getStreamState = state => state.stream;

export const isStreamFetching = createSelector(getStreamState, state => state.fetching);

export const getStreamNextHref = createSelector(getStreamState, state => state.nextHref);

export const getStreamIds = createSelector(getStreamState, state => state.streamIds);

export const getStreamPlaylistName = () => 'stream';
export const getStreamPlaylistTitle = () => 'Stream';

export const getStreamPlaylist = createSelector(
  getStreamPlaylistName,
  getStreamPlaylistTitle,
  getStreamIds,
  (name, title, trackIds) => ({
    name: name || '',
    title: title || '',
    trackIds: trackIds || [],
  }),
);
