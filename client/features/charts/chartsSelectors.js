import { createSelector } from 'reselect';
import { genreListData } from './chartsConsts';

const getChartsState = state => state.charts;

export const getChartsSelectedGenre = createSelector(
  getChartsState,
  chartsState => chartsState.selectedGenre,
);

export const isChartsFetching = createSelector(getChartsState, chartsState => chartsState.fetching);

export const getCurrentGenreTitle = createSelector(getChartsSelectedGenre, (selectedGenre) => {
  const genreObj = genreListData && genreListData.find(g => g.link === selectedGenre);
  return genreObj && genreObj.title;
});

export const getChartsNextHref = createSelector(
  getChartsState,
  chartsState => chartsState.nextHref,
);

export const getCurrentCharts = createSelector(
  getChartsState,
  getChartsSelectedGenre,
  (state, selectedGenre) => selectedGenre && state[selectedGenre],
);

export function getChartsByGenre(state, genre) {
  return genre && state[genre];
}

export const getSelectedGenreCharts = createSelector(
  getChartsState,
  getChartsSelectedGenre,
  (state, genre) => genre && state[genre],
);
