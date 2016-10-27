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
  const trackId = track.get('id');
  const artist = getArtistByTrackId(state, trackId);
  return {
    liked: isTrackLiked(state, trackId),
    trackDesc: track.get('description'),
    trackTitle: track.get('title'),
    trackCreatedAt: track.get('createdAt').replace('+0000', ''),
    artistName: artist.get('username'),
    artistLinkUrl: `/artist/${artist.get('id')}`
  };
};

const mergeProps = (stateProps, { dispatch }, { track }) => {
  const { liked } = stateProps;
  const trackId = track.get('id');
  return {
    ...stateProps,
    handleToggleLike() {
      dispatch(liked ? startUnlikeSong(trackId) : startLikeSong(trackId));
    }
  };
};

export default connect(mapStateToProps, null, mergeProps)(TrackInfo);
