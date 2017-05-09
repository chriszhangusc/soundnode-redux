import { connect } from 'react-redux';

import { clearAndHideSearchResults, requestDropdownSearch } from 'client/features/dropdownSearch/dropdownSearchActions';

import {
  isDropdownShown,
  getDropdownSearchArtistIds,
  getDropdownSearchTrackIds,
} from 'client/features/dropdownSearch/dropdownSearchSelectors';

import NavSearch from '../components/NavSearch';

const mapStateToProps = state => ({
  dropdownShown: isDropdownShown(state),
  artistIds: getDropdownSearchArtistIds(state),
  trackIds: getDropdownSearchTrackIds(state),
});

const mapDispatchToProps = dispatch => ({
  handleChange(keywords) {
    dispatch(requestDropdownSearch(keywords));
  },

  handleBlur() {
    dispatch(clearAndHideSearchResults());
  },

  handleFocus(keywords) {
    if (keywords.trim() === '') dispatch(clearAndHideSearchResults());
    else dispatch(requestDropdownSearch(keywords));
  },

  handleShowAll(rawKeywords) {
    const keywords = rawKeywords.toLowerCase().trim();
    if (keywords !== '') {
      dispatch(clearAndHideSearchResults());
      // browserHistory.push({
      //   pathname: '/search',
      //   query: { q: keywords },
      // });
      // dispatch(sagaSearch(keywords));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavSearch);
