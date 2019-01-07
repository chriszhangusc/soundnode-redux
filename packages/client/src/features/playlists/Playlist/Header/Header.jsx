import React from 'react';
import styled from 'styled-components';
import { formatDurationCompact } from '@soundnode-redux/client/src/common/utils/formatUtils';
import pluralize from 'pluralize';
import ProfileImage from './ProfileImage';
import ActionList from './ActionList';

const Title = styled.div`
  font-size: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Column = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  /* justify-content: center; */
  flex-direction: column;
  margin-left: 24px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

const Subtitle = styled.span`
  display: inline-block;
  white-space: nowrap;
  font-size: 0.95rem;
  color: ${props => props.theme.colors.fontColorSub};
`;

const HeaderWrapper = styled.div`
  display: flex;
  margin-top: 64px;
  margin-bottom: 40px;
  flex-direction: row;
  flex: 1;
`;

// Need to handle empty playlist
function Header({ playlist }) {
  return (
    <HeaderWrapper>
      <ProfileImage playlistId={playlist.id} />
      <Column>
        <Row>
          <Title>{playlist.title}</Title>
        </Row>
        <Row>
          <Subtitle>
            {`${playlist.trackCount} ${pluralize('track', playlist.trackCount)} in `}
            {formatDurationCompact(playlist.duration)}
          </Subtitle>
        </Row>
        <Row>
          <Subtitle>Created on {playlist.createdAt.slice(0, 11)}</Subtitle>
        </Row>
        <Row>
          <Subtitle>{playlist.description}</Subtitle>
        </Row>
        <Row>
          <ActionList playlist={playlist} />
        </Row>
      </Column>
    </HeaderWrapper>
  );
}

export default Header;
