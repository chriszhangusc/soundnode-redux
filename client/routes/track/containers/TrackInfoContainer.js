import { connect } from 'react-redux';
import {
  isTrackLiked,
  getArtistByTrackId
} from 'client/redux/modules/reducers';
import {
  startLikeSong,
  startUnlikeSong
} from 'client/redux/modules/user';
import TrackInfo from '../components/TrackInfo';

// trackDesc,
// trackTitle,
// trackCreatedAt,
// artistLinkUrl,
// artistName,
// liked,
// handleToggleLike

const mapStateToProps = (state, { track }) => {
  const artist = getArtistByTrackId(state, track.getId());
  return {
    liked: isTrackLiked(state, track.getId()),
    trackDesc: track.getDescription(),
    trackTitle: track.getTitle(),
    trackCreatedAt: track.getCreatedAt().replace('+0000', ''),
    artistName: artist.getUsername(),
    artistLinkUrl: `/artist/${artist.getId()}`
  };
};

const mergeProps = (stateProps, { dispatch }, { track }) => {
  const { liked } = stateProps;
  const trackId = track.getId();
  return {
    ...stateProps,
    handleToggleLike() {
      dispatch(liked ? startUnlikeSong(trackId) : startLikeSong(trackId));
    }
  };
};

export default connect(mapStateToProps, null, mergeProps)(TrackInfo);
