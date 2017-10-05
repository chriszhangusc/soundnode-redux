import React from 'react';
import styled from 'styled-components';
import TrackImage from 'common/components/images/TrackImage';
import { getLargeVersion } from 'common/utils/imageUtils';
import LinkButton from 'common/components/links/LinkButton';
import Icon from 'common/components/icons/Icon';
import { formatDurationCompact } from 'common/utils/formatUtils';
import PlaylistImage from 'common/components/images/PlaylistImage';

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

const ActionsWrapper = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
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
function Header({ playlist }) {
  const images = buildImageGrid(playlist.tracks);
  console.log(images);
  return (
    <HeaderWrapper>
      {/* <TrackImage src={getLargeVersion(playlist.tracks[0].artworkUrl)} size="medium" /> */}
      <PlaylistImage images={images} />
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
          <ActionsWrapper>
            <LinkButton onClick={() => {}} title="Like Playlist">
              <Icon iconName="heart" />LIKE
            </LinkButton>

            <LinkButton onClick={() => {}} title="Add to Current Play Queue">
              <Icon iconName="plus" />ADD TO PLAY QUEUE
            </LinkButton>

            <LinkButton
              href={playlist.permalinkUrl}
              target="_blank"
              title="Visit Playlist on SoundCloud"
            >
              <Icon iconName="external-link" />PERMALINK
            </LinkButton>

            <LinkButton onClick={() => {}} title="Delete Playlist">
              <Icon iconName="remove" />DELETE
            </LinkButton>
          </ActionsWrapper>
        </Row>
      </Column>
    </HeaderWrapper>
  );
}

export default Header;
