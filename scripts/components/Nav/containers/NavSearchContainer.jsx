import { connect } from 'react-redux';
import {
  sagaSearch,
  clearAndHideSearchResults
} from 'client/modules/search/actions';
import {
  getSearchArtistMap,
  getSearchTrackMap,
  isSearchResultFetching,
  isSearchResultShown
} from 'client/modules/reducers';
import NavSearch from '../components/NavSearch';

const mapStateToProps = (state) => {
  return ({
    shouldShowResults: isSearchResultShown(state),
    isFetching: isSearchResultFetching(state),
    artists: getSearchArtistMap(state).toArray(),
    tracks: getSearchTrackMap(state).toArray()
  });
};

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
