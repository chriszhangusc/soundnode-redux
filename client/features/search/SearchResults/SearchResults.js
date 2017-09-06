import { connect } from 'react-redux';
import SongCardList from 'common/components/SongCardList';
import { isSearching } from 'features/search/searchSelectors';
import { getVisiblePlayQueue } from 'features/playQueue/playQueueSelectors';
import { loadMoreSearchResults } from 'features/search/searchActions';

function mapStateToProps(state) {
  return {
    fetching: isSearching(state),
    trackIds: getVisiblePlayQueue(state),
  };
}

export default connect(mapStateToProps, { scrollFunc: loadMoreSearchResults })(SongCardList);
