/* Action types for charts */
export const CHARTS_GENRE_CHANGE = 'CHARTS_GENRE_CHANGE';
export const CHARTS_REQUEST = 'CHARTS_REQUEST';
export const CHARTS_RECEIVE = 'CHARTS_RECEIVE';
export const CHARTS_FETCH_FAIL = 'CHARTS_FETCH_FAIL';
export const CHARTS_CLEAR = 'CHARTS_CLEAR';
export const CHARTS_FETCH_STOP = 'CHARTS_FETCH_STOP';
export const CHARTS_GENRE_LIST_UPDATE = 'CHARTS_GENRE_LIST_UPDATE';
export const CHARTS_CLEAR_STATE = 'CHARTS_CLEAR_STATE';

// These constants should be fetched from the Database!
export const TOP_COUNT = 50;
// Number of items to fetch each time.
export const LIMIT_EACH_FETCH = 25;
export const DEFAULT_GENRE = 'all-music';
export const CHARTS_MAIN_TITLE_PREFIX = 'TOP 50 - ';
export const CHARTS_SUBTITLE = 'Charts By Genre';
