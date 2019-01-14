import React from 'react';
import PropTypes from 'prop-types';
import TrackImage from '@soundnode-redux/client/src/common/components/images/TrackImage';
import PlaybackOverlay from '@soundnode-redux/client/src/common/components/PlaybackOverlay';
import { getLargeVersion } from '@soundnode-redux/client/src/common/utils/imageUtils';

function SongCardImage({ src }) {
  return (
    <TrackImage src={getLargeVersion(src)} size="medium">
      <PlaybackOverlay
        active={false}
        loading={false}
        playing={false}
        // onClick={() => {
        //   if (!loading) {
        //     handleImageClick(trackId, playlist);
        //   }
        //   // Sync with currently active play queue
        // }}
      />
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
