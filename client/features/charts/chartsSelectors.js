import { createSelector } from 'reselect';
import { genreListData } from './chartsConsts';

const getChartsState = state => state.charts;

export const getSelectedGenre = createSelector(
  getChartsState,
  chartsState => chartsState.selectedGenre,
);

export const getCurrentPlaylistName = createSelector(getSelectedGenre, genre => `charts-${genre}`);

export const isChartsFetching = createSelector(getChartsState, chartsState => chartsState.fetching);

export const getCurrentGenreTitle = createSelector(getSelectedGenre, (selectedGenre) => {
  const genreObj = genreListData && genreListData.find(g => g.link === selectedGenre);
  return genreObj && genreObj.title;
});

export const getChartsNextHref = createSelector(
  getChartsState,
  chartsState => chartsState.nextHref,
);

export const getCurrentCharts = createSelector(
  getChartsState,
  getSelectedGenre,
  (state, genre) => state[genre],
);

