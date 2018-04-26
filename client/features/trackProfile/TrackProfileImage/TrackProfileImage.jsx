import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { connect } from 'react-redux';
import * as selectors from 'features/trackProfile/trackProfileSelectors';
import * as playerActions from 'features/player/playerActions';
import TrackImage from 'common/components/images/TrackImage';
import PlaybackOverlay from 'common/components/PlaybackOverlay';
import OverlayInfoBar from './OverlayInfoBar';
import OverlayIconInfo from './OverlayIconInfo';

class TrackProfileImage extends React.Component {
  handleImageClick = () => {
    const { trackId, togglePlaybackState } = this.props;
    togglePlaybackState(trackId);
  };

  render() {
    const {
      artworkUrl, playing, active, liked, playbackCount, likesCount,
    } = this.props;

    return (
      <TrackImage src={artworkUrl} size="large">
        <PlaybackOverlay playing={playing} active={active} onClick={this.handleImageClick} />
        <OverlayInfoBar>
          <OverlayIconInfo iconName="play" info={playbackCount} />
          <OverlayIconInfo iconName="heart" iconActive={liked} info={likesCount} />
        </OverlayInfoBar>
      </TrackImage>
    );
  }
}

TrackProfileImage.defaultProps = {
  trackId: null,
  artworkUrl: '',
  playing: false,
  active: false,
  liked: false,
  playbackCount: '',
  likesCount: '',
  togglePlaybackState: noop,
};

TrackProfileImage.propTypes = {
  trackId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  artworkUrl: PropTypes.string,
  playing: PropTypes.bool,
  active: PropTypes.bool,
  liked: PropTypes.bool,
  playbackCount: PropTypes.string,
  likesCount: PropTypes.string,
  togglePlaybackState: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    trackId: selectors.getProfiledTrackId(state),
    artworkUrl: selectors.getProfiledTrackArtworkUrl(state),
    playing: selectors.isProfiledTrackPlaying(state),
    active: selectors.isProfiledTrackActive(state),
    liked: selectors.isProfiledTrackLiked(state),
    likesCount: selectors.getProfiledTrackLikesCount(state),
    playbackCount: selectors.getProfiledTrackPlaybackCount(state),
  };
}

export default connect(mapStateToProps, playerActions)(TrackProfileImage);
