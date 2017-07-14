import React from 'react';
import styled from 'styled-components';
import RouterLink from 'common/components/links/RouterLink';

const TrackTitle = RouterLink.extend`
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  font-size: 1.05rem;
`;

const TrackSubtitle = RouterLink.extend`
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
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
        <TrackSubtitle to={artistUrl || '/'}>
          {subtitle}
        </TrackSubtitle>
      </div>
    </DetailsWrapper>
  );
}

export default PlayerTrackDetails;
