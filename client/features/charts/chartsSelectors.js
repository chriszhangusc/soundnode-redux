import { createSelector } from 'reselect';
import { genreListData } from './chartsConsts';

const getChartsState = state => state.charts;

export const getChartsSelectedGenre = createSelector(
  getChartsState,
  chartsState => chartsState.selectedGenre,
);

export const getChartsTrackIds = createSelector(
  getChartsState,
  chartsState => chartsState.trackIds,
);

export const isChartsFetching = createSelector(getChartsState, chartsState => chartsState.fetching);

export const getChartsFetchOffset = createSelector(
  getChartsState,
  chartsState => chartsState.fetchOffset,
);

export const getGenreList = createSelector(getChartsState, chartsState => chartsState.genreList);

export const getCurrentGenreTitle = createSelector(getChartsSelectedGenre, (selectedGenre) => {
  const genreObj = genreListData && genreListData.find(g => g.link === selectedGenre);
  return genreObj && genreObj.title;
});
