import React from 'react';
import styled from 'styled-components';
import TrackImage from 'common/components/images/TrackImage';
import { getLargeVersion } from 'common/utils/imageUtils';
import LinkButton from 'common/components/links/LinkButton';
import Icon from 'common/components/icons/Icon';

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

function Header({ playlist }) {
  return (
    <HeaderWrapper>
      <TrackImage src={getLargeVersion(playlist.tracks[0].artworkUrl)} size="medium" />
      <Column>
        <Row>
          <Title>{playlist.title}</Title>
        </Row>
        <Row>
          <Subtitle>My Playlist</Subtitle>
        </Row>
        <Row>
          <Subtitle>18 songs • 48:16</Subtitle>
        </Row>
        <Row>
          <ActionsWrapper>
            <LinkButton to="/">
              <Icon iconName="bookmark" title="Add to Playlist" />ADD TO PLAYLIST
            </LinkButton>

            <LinkButton href="#" target="_blank" title="Visit Track on SoundCloud">
              <Icon iconName="external-link" />PERMALINK
            </LinkButton>

            <LinkButton onClick={() => {}} title="Copy Permalink">
              <Icon iconName="clipboard" title="Copy track link to clipboard" />COPY TRACK LINK
            </LinkButton>
          </ActionsWrapper>
        </Row>
      </Column>
    </HeaderWrapper>
  );
}

export default Header;
