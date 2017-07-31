import React from 'react';
import PropTypes from 'prop-types';
import TrackImage from 'common/components/images/TrackImage';
import PlaybackOverlay from 'common/components/PlaybackOverlay';
import OverlayInfoBar from './OverlayInfoBar';
import OverlayIconInfo from './OverlayIconInfo';

function TrackProfileImage({ src, playing, active, liked, playbackCount, likesCount, onClick }) {
  return (
    <TrackImage src={src} size="large">
      <PlaybackOverlay playing={playing} active={active} onClick={onClick} />
      <OverlayInfoBar>
        <OverlayIconInfo iconName="play" iconActive={playing} info={playbackCount} />
        <OverlayIconInfo iconName="heart" iconActive={liked} info={likesCount} />
      </OverlayInfoBar>
    </TrackImage>
  );
}

TrackProfileImage.defaultProps = {
  src: '',
  playing: false,
  active: false,
  liked: false,
  playbackCount: '',
  likesCount: '',
  trackId: null,
  onClick: null,
};

TrackProfileImage.propTypes = {
  src: PropTypes.string,
  playing: PropTypes.bool,
  active: PropTypes.bool,
  liked: PropTypes.bool,
  playbackCount: PropTypes.string,
  likesCount: PropTypes.string,
  onClick: PropTypes.func,
};

export default TrackProfileImage;
