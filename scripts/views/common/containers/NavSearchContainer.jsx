import { connect } from 'react-redux';
import NavSearch from '../components/NavSearch';
import {
  doSearch,
  clearAndHideSearchResults
} from '../../../modules/search/actions';

import {
  getSearchUsersAsArray,
  getSearchTracksAsArray,
  getSearchIsFetching,
  getShowResults
} from '../../../modules/reducers';

const mapStateToProps = state => ({
  showResults: getShowResults(state),
  isFetching: getSearchIsFetching(state),
  users: getSearchUsersAsArray(state),
  tracks: getSearchTracksAsArray(state)
});

const mapDispatchToProps = dispatch => ({
  handleChange: (keywords) => {
    if (keywords.trim() === '') dispatch(clearAndHideSearchResults());
    else dispatch(doSearch(keywords));
  },
  handleBlur: () => {
    dispatch(clearAndHideSearchResults());
  },
  handleFocus: (keywords) => {
    if (keywords === '') dispatch(clearAndHideSearchResults());
    else dispatch(doSearch(keywords));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NavSearch);
