import { connect } from 'react-redux';
import NavSearch from '../components/NavSearch';
import {
  doSearch,
  hideSearchResults
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
  handleSearch: (keywords) => {
    dispatch(doSearch(keywords));
  },
  handleBlur: () => {
    dispatch(hideSearchResults());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NavSearch);
