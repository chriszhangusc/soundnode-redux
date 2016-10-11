import { connect } from 'react-redux';

import {
  getArtistRecord,
  getArtistFetchState,
  getArtistTracksAsArray
} from 'client/modules/reducers';

import ArtistDetails from '../components/ArtistDetails';

const mapStateToProps = (state, ownProps) => ({
  isFetching: getArtistFetchState(state),
  artistRecord: getArtistRecord(state),
  tracks: getArtistTracksAsArray(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetails);
