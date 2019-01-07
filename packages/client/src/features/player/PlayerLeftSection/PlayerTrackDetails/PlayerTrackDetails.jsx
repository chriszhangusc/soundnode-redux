import React from 'react';
import PropTypes from 'prop-types';
import FlexColumn from '@soundnode-redux/client/src/common/components/layouts/FlexColumn';
import TrackTitle from './TrackTitle';
import TrackSubtitle from './TrackSubtitle';

function PlayerTrackDetails({ title, subtitle, trackUrl, artistUrl }) {
  return (
    <FlexColumn>
      <TrackTitle to={trackUrl}>
        {title}
      </TrackTitle>
      <TrackSubtitle to={artistUrl}>
        {subtitle}
      </TrackSubtitle>
    </FlexColumn>
  );
}

PlayerTrackDetails.defaultProps = {
  title: '',
  subtitle: '',
  trackUrl: '',
  artistUrl: '',
};

PlayerTrackDetails.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  trackUrl: PropTypes.string,
  artistUrl: PropTypes.string,
};

export default PlayerTrackDetails;
