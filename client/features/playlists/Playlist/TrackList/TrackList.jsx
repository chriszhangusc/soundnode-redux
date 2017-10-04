import React from 'react';
import styled from 'styled-components';
import TrackImage from 'common/components/images/TrackImage';
import { formatDuration } from 'common/utils/formatUtils';

const TrackItem = styled.div`
  padding: 8px 0;
  display: flex;
  cursor: pointer;
  align-items: middle;
  border-top: 1px solid ${props => props.theme.colors.separatorDark};
  &:hover {
    background: ${props => props.theme.colors.separatorDark};
  }
`;

const TrackTitle = styled.span`
  font-size: 0.95rem;
  max-width: 100%;
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

const ShowMoreLessButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  padding: 10px 0;
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.colors.separatorDark};
  }
`;

const TrackListContentWrapper = styled.div`
  max-height: ${props => (props.folded ? 147 : props.itemCount * 49)}px;
  transition: max-height 1000ms ease-in-out;
  overflow: hidden;
`;

const TrackListWrapper = styled.div`
  background-color: ${props => props.theme.colors.bg};
  box-shadow: 0 0 12px 8px ${props => props.theme.colors.boxShadowColor};
  border: 1px solid ${props => (props.active ? props.theme.colors.themeColor : 'transparent')};
  padding: 16px 16px 0 16px;
`;

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

class TrackList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folded: true,
    };
  }

  handleShowMoreLessClick = () => {
    this.setState({
      folded: !this.state.folded,
    });
  };

  render() {
    const { playlist } = this.props;
    return (
      <TrackListWrapper>
        <TrackListHeaderWrapper>
          <IdHeader>#</IdHeader>
          <TableHeader width="40%">Title</TableHeader>
          <TableHeader width="30%">Artist</TableHeader>
          <TableHeader width="15%">Duration</TableHeader>
          <TableHeader width="10%">Played</TableHeader>
        </TrackListHeaderWrapper>
        <TrackListContentWrapper folded={this.state.folded} itemCount={playlist.tracks.length}>
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
        </TrackListContentWrapper>
        {playlist.tracks.length >= 4 && (
          <ShowMoreLessButton onClick={this.handleShowMoreLessClick}>
            {this.state.folded ? 'Show More' : 'Show Less'}
          </ShowMoreLessButton>
        )}
      </TrackListWrapper>
    );
  }
}

export default TrackList;
