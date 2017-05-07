import { createSelector } from 'reselect';

const getChartsState = state => state.charts;

export const getChartsSelectedGenre = createSelector(
  getChartsState,
  chartsState => chartsState.selectedGenre,
);

export const getChartsTrackIds = createSelector(
  getChartsState,
  chartsState => chartsState.trackIds,
);

export const isChartsFetching = createSelector(
  getChartsState,
  chartsState => chartsState.fetching,
);

export const getChartsFetchOffset = createSelector(
  getChartsState,
  chartsState => chartsState.fetchOffset,
);

export const getGenreList = createSelector(
  getChartsState,
  chartsState => chartsState.genreList,
);

export const getCurrentGenreTitle = createSelector(
  getGenreList,
  getChartsSelectedGenre,
  (genreList, selectedGenre) => {
    const genreObj = genreList && genreList.find(g => g.link === selectedGenre);
    return genreObj && genreObj.title;
  },
);

