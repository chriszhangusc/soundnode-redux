import React from 'react';
import PropTypes from 'prop-types';
import FlexColumn from 'common/components/layouts/FlexColumn';
import RouterLink from 'common/components/links/RouterLink';
import { truncateMaxWidth } from 'app/css/styleUtils';

const TrackTitle = RouterLink.extend`
  font-size: 1.05rem;
  ${truncateMaxWidth('100%')};
`;

const TrackSubtitle = TrackTitle.extend`
  color: ${props => props.theme.colors.fontColorSub};
  font-size: 0.95rem;
`;

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
