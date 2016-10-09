import { connect } from 'react-redux';

import {
  doSearch,
  sagaSearch,
  clearAndHideSearchResults
} from 'client/modules/search/actions';

import {
  getSearchUsersAsArray,
  getSearchTracksAsArray,
  getSearchIsFetching,
  getShowResults
} from 'client/modules/reducers';

import NavSearch from '../components/NavSearch';

const mapStateToProps = state => ({
  showResults: getShowResults(state),
  isFetching: getSearchIsFetching(state),
  users: getSearchUsersAsArray(state),
  tracks: getSearchTracksAsArray(state)
});

const mapDispatchToProps = dispatch => ({
  handleChange: (keywords) => {
    if (keywords.trim() === '') dispatch(clearAndHideSearchResults());
    else dispatch(sagaSearch(keywords));
  },
  handleBlur: () => {
    dispatch(clearAndHideSearchResults());
  },
  handleFocus: (keywords) => {
    if (keywords.trim() === '') dispatch(clearAndHideSearchResults());
    else dispatch(sagaSearch(keywords));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NavSearch);
