import { connect } from 'react-redux';
import SongCardList from 'common/components/SongCardList';
import { isSearching, getSearchTrackIds, getSearchPlaylist } from 'features/search/searchSelectors';
import { loadMoreSearchResults } from 'features/search/searchActions';

function mapStateToProps(state) {
  return {
    fetching: isSearching(state),
    playlist: getSearchPlaylist(state),
    trackIds: getSearchTrackIds(state),
  };
}

export default connect(mapStateToProps, { scrollFunc: loadMoreSearchResults })(SongCardList);
