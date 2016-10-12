import { connect } from 'react-redux';

import {
  getArtistRecord,
  getArtistFetchState
} from 'client/modules/reducers';

import ArtistDetails from '../components/ArtistDetails';

const mapStateToProps = state => ({
  isFetching: getArtistFetchState(state),
  artist: getArtistRecord(state)
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetails);
