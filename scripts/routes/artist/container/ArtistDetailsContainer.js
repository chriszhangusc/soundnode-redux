import { connect } from 'react-redux';

import {
  getArtistFetchState,
  getArtistAvatarUrl,
  getArtistName,
  getArtistFollowers,
  getArtistDescription,
  getArtistTracksAsArray
} from 'client/modules/reducers';

import { formatImageUrl } from 'client/utils/FormatUtils';
import { crop } from 'client/constants/ImageConstants';
import ArtistDetails from '../components/ArtistDetails';

const mapStateToProps = (state, ownProps) => ({
  isFetching: getArtistFetchState(state),
  avatarUrl: formatImageUrl(getArtistAvatarUrl(state), crop),
  artistName: getArtistName(state),
  followers: getArtistFollowers(state),
  description: getArtistDescription(state),
  tracks: getArtistTracksAsArray(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetails);
