import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {
  sagaSearch,
  sagaDropdownSearch,
  clearAndHideSearchResults
} from 'client/redux/modules/search';
import {
  isSearchResultShown,
  getDropdownSearchArtistIds,
  getDropdownSearchTrackIds
} from 'client/redux/modules/reducers';
import NavSearch from '../components/NavSearch';

const mapStateToProps = (state) => {
  return ({
    shouldShowResults: isSearchResultShown(state),
    artistIds: getDropdownSearchArtistIds(state),
    trackIds: getDropdownSearchTrackIds(state)
  });
};

const mapDispatchToProps = dispatch => ({
  handleChange: (keywords) => {
    if (keywords.trim() === '') dispatch(clearAndHideSearchResults());
    else dispatch(sagaDropdownSearch(keywords, 4));
  },
  handleBlur: () => {
    dispatch(clearAndHideSearchResults());
  },
  handleFocus: (keywords) => {
    if (keywords.trim() === '') dispatch(clearAndHideSearchResults());
    else dispatch(sagaDropdownSearch(keywords, 4));
  },
  handleShowAll: (rawKeywords) => {
    const keywords = rawKeywords.toLowerCase().trim();
    if (keywords !== '') {
      dispatch(clearAndHideSearchResults());
      browserHistory.push({
        pathname: '/search',
        query: { q: keywords }
      });
      dispatch(sagaSearch(keywords, 20));
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NavSearch);
