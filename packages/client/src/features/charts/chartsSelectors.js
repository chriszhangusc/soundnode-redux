import { createSelector } from 'reselect';
import { GENRE_LIST } from './chartsConsts';

const getChartsState = state => state.charts;

export const getSelectedGenre = createSelector(
  getChartsState,
  chartsState => chartsState.selectedGenre,
);

export const getCurrentPlaylistName = createSelector(
  getSelectedGenre,
  genre => `charts-${genre}`,
);

export const isChartsFetching = createSelector(
  getChartsState,
  chartsState => chartsState.fetching,
);

export const getCurrentGenreTitle = createSelector(
  getSelectedGenre,
  selectedGenre => {
    const genreObj = GENRE_LIST && GENRE_LIST.find(g => g.link === selectedGenre);
    return genreObj && genreObj.title;
  },
);

export const getChartsNextHref = createSelector(
  getChartsState,
  chartsState => chartsState.nextHref,
);

export const getCurrentChartsTrackIds = createSelector(
  getChartsState,
  getSelectedGenre,
  (state, genre) => state[genre],
);

export const getCurrentChartsPlaylist = createSelector(
  getCurrentChartsTrackIds,
  getCurrentPlaylistName,
  getCurrentGenreTitle,
  (trackIds, name, title) => ({
    trackIds: trackIds || [],
    name: name || '',
    title: title || '',
  }),
);
