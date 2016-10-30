import { connect } from 'react-redux';
import SongCardList from 'client/components/SongCardList';
import { isArtistTracksFetching, getArtistTrackIds, fetchMoreArtistTracks } from 'client/redux/modules/artist';

// Container for SongCardList
// Simply providing slices of state for the component to render.
const mapStateToProps = state => ({
  fetching: isArtistTracksFetching(state),
  trackIds: getArtistTrackIds(state),
});

const mapDispatchToProps = dispatch => ({
  // Load more tracks
  scrollFunc() {
    console.log('Fetch more artist tracks');
    dispatch(fetchMoreArtistTracks());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
