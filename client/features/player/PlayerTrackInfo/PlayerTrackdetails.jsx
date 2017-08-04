import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RouterLink from 'common/components/links/RouterLink';
import { truncateMaxWidth } from 'app/css/styleUtils';

const TrackTitle = RouterLink.extend`
  display: inline-block;
  font-size: 1.05rem;
  ${truncateMaxWidth('100%')};
`;

const TrackSubtitle = TrackTitle.extend`
  color: ${props => props.theme.fontColorSub};
  font-size: 0.95rem;
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

function PlayerTrackDetails({ title, subtitle, trackUrl, artistUrl }) {
  return (
    <DetailsWrapper>
      <div>
        <TrackTitle to={trackUrl}>
          {title}
        </TrackTitle>
      </div>
      <div>
        <TrackSubtitle to={artistUrl}>
          {subtitle}
        </TrackSubtitle>
      </div>
    </DetailsWrapper>
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
