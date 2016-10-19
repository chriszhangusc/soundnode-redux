import { connect } from 'react-redux';
import SongCardList from 'client/components/SongCardList';
import { isArtistTracksFetching, getArtistTrackMap } from 'client/redux/modules/reducers';

// Container for SongCardList
// Simply providing slices of state for the component to render.
const mapStateToProps = state => ({
  isFetching: isArtistTracksFetching(state),
  tracks: getArtistTrackMap(state)
});

const mapDispatchToProps = dispatch => ({
  scrollFunc() { console.log('Scroll'); }
});

export default connect(mapStateToProps, mapDispatchToProps)(SongCardList);
