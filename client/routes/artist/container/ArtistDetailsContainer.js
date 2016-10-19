import { connect } from 'react-redux';

import {
  getArtistRecord,
  isArtistFetching
} from 'client/redux/modules/reducers';

import ArtistDetails from '../components/ArtistDetails';

const mapStateToProps = state => ({
  isFetching: isArtistFetching(state),
  artist: getArtistRecord(state)
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetails);
