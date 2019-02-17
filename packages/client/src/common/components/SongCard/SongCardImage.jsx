import React from 'react';
import PropTypes from 'prop-types';
import TrackImage from '@soundnode-redux/client/src/common/components/images/TrackImage';
import PlaybackOverlay from '@soundnode-redux/client/src/common/components/PlaybackOverlay';
import { getLargeVersion } from '@soundnode-redux/client/src/common/utils/imageUtils';

function SongCardImage({ src, active, loading, playing, onToggle }) {
  return (
    <TrackImage src={getLargeVersion(src)} size="medium">
      <PlaybackOverlay active={active} loading={loading} playing={playing} onClick={onToggle} />
    </TrackImage>
  );
}

/* Prop type validation */

const propTypes = {
  src: PropTypes.string,
};

SongCardImage.defaultProps = {
  src: '',
  active: false,
  isPlaying: false,
};

SongCardImage.propTypes = {
  ...propTypes,
};

export default SongCardImage;
