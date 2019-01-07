import { connect } from 'react-redux';
import SongCardList from '@soundnode-redux/client/src/common/components/SongCardList';
import { isSearching, getSearchTrackIds, getSearchPlaylist } from '@soundnode-redux/client/src/features/search/searchSelectors';

function mapStateToProps(state) {
  return {
    fetching: isSearching(state),
    playlist: getSearchPlaylist(state),
    trackIds: getSearchTrackIds(state),
  };
}

export default connect(mapStateToProps)(SongCardList);
