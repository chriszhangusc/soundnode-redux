import { connect } from 'react-redux';
import SongCardList from 'client/components/SongCardList';
import { isArtistTracksFetching, getArtistTrackIds } from 'client/redux/modules/reducers';

// Container for SongCardList
// Simply providing slices of state for the component to render.
const mapStateToProps = state => ({
  fetching: isArtistTracksFetching(state),
  trackIds: getArtistTrackIds(state)
});

const mapDispatchToProps = dispatch => ({
  scrollFunc() { console.log('Scroll'); }
});

export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
