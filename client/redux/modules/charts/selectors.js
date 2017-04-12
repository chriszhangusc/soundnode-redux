/* Selectors */
const getChartsState = state => state.charts;
export const getChartsGenre = state => getChartsState(state).genre;
export const getChartsTrackIds = state => getChartsState(state).trackIds;
export const isChartsFetching = state => getChartsState(state).fetching;
export const getChartsFetchOffset = state => getChartsState(state).fetchOffset;
