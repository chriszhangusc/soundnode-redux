import { connect } from 'react-redux';
import ArtistDetails from '../components/ArtistDetails';
import {
  getArtistFetchState,
  getArtistAvatarUrl,
  getArtistName,
  getArtistFollowers,
  getArtistDescription,
  getArtistTracksAsArray
} from '../../../modules/reducers';
import { formatImageUrl } from '../../../utils/FormatUtils';
import { crop } from '../../../constants/ImageConstants';

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
