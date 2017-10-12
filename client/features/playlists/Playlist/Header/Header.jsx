import React from 'react';
import styled from 'styled-components';
import { getLargeVersion } from 'common/utils/imageUtils';
import { formatDurationCompact } from 'common/utils/formatUtils';
import PlaylistImage from './PlaylistImage';
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

function buildImageGrid(tracks) {
  return tracks.map(track => getLargeVersion(track.artworkUrl)).slice(0, 4);
}

// Need to handle empty playlist
function Header({ playlist, tracks }) {
  const images = buildImageGrid(tracks);
  return (
    <HeaderWrapper>
      {/* <TrackImage src={getLargeVersion(playlist.tracks[0].artworkUrl)} size="medium" /> */}
      <PlaylistImage images={images} playlistId={playlist.id} />
      <Column>
        <Row>
          <Title>{playlist.title}</Title>
        </Row>
        <Row>
          <Subtitle>
            {playlist.trackCount} song{playlist.trackCount > 1 && 's'} in{' '}
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
