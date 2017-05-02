/* Selectors */
const getChartsState = state => state.charts;
export const getChartsGenre = state => getChartsState(state).genre;
export const getChartsTrackIds = state => getChartsState(state).trackIds;
export const isChartsFetching = state => getChartsState(state).fetching;
export const getChartsFetchOffset = state => getChartsState(state).fetchOffset;
export const getGenreList = state => getChartsState(state).genreList;

export const getCurrentGenreTitle = (state) => {
  const genreList = getGenreList(state);
  const currentGenreLink = getChartsGenre(state);
  const genreObj = genreList && genreList.find(g => g.link === currentGenreLink);
  return genreObj && genreObj.title;
};

