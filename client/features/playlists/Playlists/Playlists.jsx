import React from 'react';
import { fetchMyPlaylists } from 'features/playlists/playlistsApi';
import TrackImage from 'common/components/images/TrackImage';
import { getLargeVersion } from 'common/utils/imageUtils';
import styled from 'styled-components';
import { formatDuration } from 'common/utils/formatUtils';
import LinkButton from 'common/components/links/LinkButton';
import Icon from 'common/components/icons/Icon';

const Wrapper = styled.div`
  max-width: 1856px;
  margin-left: auto;
  margin-right: auto;
`;

const PlaylistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 50px;
  margin-bottom: 30px;
`;

const Header = styled.div`
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

const TrackList = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${props => props.theme.colors.separatorDark};
`;

const TrackItem = styled.div`
  padding: 8px 0;
  display: flex;
  cursor: pointer;
  align-items: middle;
  border-bottom: 1px solid ${props => props.theme.colors.separatorDark};
  &:hover {
    background: ${props => props.theme.colors.separatorDark};
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

const TrackTitle = styled.span`
  font-size: 0.95rem;
  max-width: 100%;
`;

// const TrackSubtitle = TrackTitle.extend`
//   color: ${props => props.theme.colors.fontColorSub};
//   font-size: 0.9rem;
// `;

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

const TrackListWrapper = styled.div`
  background-color: ${props => props.theme.colors.bg};
  box-shadow: 0 0 12px 8px ${props => props.theme.colors.boxShadowColor};
  border: 1px solid ${props => (props.active ? props.theme.colors.themeColor : 'transparent')};
  padding: 16px;
`;

const TrackListHeaderWrapper = styled.div`
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
`;

const TableCell = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: ${props => props.width};
`;

const TableHeader = TableCell.extend`font-weight: 600;`;

const Id = styled.div`
  display: flex;
  color: ${props => props.theme.colors.fontColorSub};
  align-items: center;
  justify-content: center;
  width: 30px;
`;

const IdHeader = Id.extend`color: ${props => props.theme.colors.fontColor};`;

class Playlists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
    };
  }

  componentDidMount() {
    // Go fetch all playlists of current logged in user.
    fetchMyPlaylists().then((playlists) => {
      this.setState({
        playlists,
      });
    });
  }

  render() {
    function formatPlaybackCount(value) {
      const thousand = 1000;
      const million = 1000000;
      const billion = 1000000000;
      const trillion = 1000000000000;
      if (value < thousand) {
        return String(value);
      }

      if (value >= thousand && value <= 1000000) {
        return `${(value / thousand).toFixed(1)}k`;
      }

      if (value >= million && value <= billion) {
        return `${(value / million).toFixed(1)}M`;
      }

      if (value >= billion && value <= trillion) {
        return `${(value / billion).toFixed(1)}B`;
      }
      return `${(value / trillion).toFixed(1)}T`;
    }

    return (
      <Wrapper>
        {this.state.playlists.map(playlist => (
          <PlaylistWrapper key={playlist.id}>
            <HeaderWrapper>
              <TrackImage src={getLargeVersion(playlist.tracks[0].artworkUrl)} size="medium" />
              <Column>
                <Row>
                  <Header>{playlist.title}</Header>
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
                      <Icon iconName="clipboard" title="Copy track link to clipboard" />COPY TRACK
                      LINK
                    </LinkButton>
                  </ActionsWrapper>
                </Row>
              </Column>
            </HeaderWrapper>
            <TrackListWrapper>
              <TrackListHeaderWrapper>
                <IdHeader>#</IdHeader>
                <TableHeader width="40%">Title</TableHeader>
                <TableHeader width="30%">Artist</TableHeader>
                <TableHeader width="15%">Duration</TableHeader>
                <TableHeader width="10%">Played</TableHeader>
              </TrackListHeaderWrapper>
              {playlist.tracks.map((track, idx) => (
                <TrackItem key={track.id}>
                  <Id>{idx + 1}</Id>
                  <TableCell width="40%">
                    <TrackImage src={track.artworkUrl} size="small" mr="10px" />
                    <TrackTitle>{track.title}</TrackTitle>
                  </TableCell>
                  <TableCell width="30%">
                    <TrackTitle>{track.user.username}</TrackTitle>
                  </TableCell>
                  <TableCell width="15%">
                    <TrackTitle>{formatDuration(track.duration)}</TrackTitle>
                  </TableCell>
                  <TableCell width="10%">
                    <TrackTitle>{formatPlaybackCount(track.playbackCount)}</TrackTitle>
                  </TableCell>
                </TrackItem>
              ))}
            </TrackListWrapper>
          </PlaylistWrapper>
        ))}
      </Wrapper>
    );
  }
}

export default Playlists;
