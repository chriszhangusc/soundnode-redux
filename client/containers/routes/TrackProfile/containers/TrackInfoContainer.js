import { connect } from 'react-redux';
import { getArtistByTrackId } from 'client/redux/modules/entities/selectors';
import { copyToClipboard } from 'client/redux/modules/copy';
import {
  startLikeSong,
  startUnlikeSong,
  isTrackLiked,
} from 'client/redux/modules/user';
import TrackInfo from '../components/TrackInfo';

const mapStateToProps = (state, { track }) => {
  const trackId = track.get('id');
  const artist = getArtistByTrackId(state, trackId);
  return {
    liked: isTrackLiked(state, trackId),
    trackDesc: track.get('description'),
    trackTitle: track.get('title'),
    trackCreatedAt: track.get('createdAt').replace('+0000', ''),
    artistName: artist.get('username'),
    artistLinkUrl: `/artist/${artist.get('id')}`,
  };
};

const mergeProps = (stateProps, { dispatch }, { track }) => {
  const { liked } = stateProps;
  const trackId = track.get('id');
  return {
    ...stateProps,
    handleToggleLike() {
      dispatch(liked ? startUnlikeSong(trackId) : startLikeSong(trackId));
    },
    handleCopyTrackLink() {
      dispatch(copyToClipboard(track.get('permalinkUrl'), 'Track permalink copied to clipboard!'));
    },
  };
};

export default connect(mapStateToProps, null, mergeProps)(TrackInfo);
