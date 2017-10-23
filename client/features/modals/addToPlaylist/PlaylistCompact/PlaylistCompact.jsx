import React from 'react';
import { connect } from 'react-redux';
import TrackImage from 'common/components/images/TrackImage';
import ColumnTitleWrapper from 'common/components/layouts/ColumnTitleWrapper';
import { truncateMaxWidth } from 'app/css/styleUtils';
import styled from 'styled-components';
import Icon from 'common/components/icons/Icon';
import IconButton from 'common/components/buttons/IconButton';
import { getTracksByPlaylistId } from 'features/entities/entitiesSelectors';

const Wrapper = styled.li`
  display: flex;
  position: relative;
  align-items: center;
  color: ${props => props.theme.colors.fontColor};
  border-bottom: 1px solid ${props => props.theme.colors.separatorDark};
  padding: 10px;
  white-space: nowrap;
  cursor: pointer;
  background-color: ${props => props.active && props.theme.colors.separatorDark};
  &:hover {
    background-color: ${props => props.theme.colors.separatorDark};
  }
`;

const PlaylistTitle = styled.span`
  font-size: 1.05rem;
  ${truncateMaxWidth('100%')};
  margin-top: 5px;
`;

const PlaylistSubtitle = PlaylistTitle.extend`
  color: ${props => props.theme.colors.fontColorSub};
  font-size: 0.95rem;
`;

const ActionButtonWrapper = styled.div`
  position: absolute;
  right: 0;
`;

function PlaylistCompact({ track, playlistId, playlistTitle, playlistTracks, onClick, isAdded }) {
  console.log('Playlist Render');
  return (
    <Wrapper>
      <TrackImage
        src={playlistTracks.length > 0 && playlistTracks[0] && playlistTracks[0].artworkUrl}
        size="mini"
      />
      <ColumnTitleWrapper>
        <PlaylistTitle>{playlistTitle}</PlaylistTitle>
        <PlaylistSubtitle>
          <Icon iconName="list" /> {playlistTracks.length}
        </PlaylistSubtitle>
      </ColumnTitleWrapper>
      <ActionButtonWrapper>
        <IconButton iconName={isAdded ? 'check' : 'plus'} iconSize="lg" onClick={onClick} />
      </ActionButtonWrapper>
    </Wrapper>
  );
}

function mapStateToProps(state, { playlistId }) {
  return {
    playlistTracks: getTracksByPlaylistId(state, playlistId),
  };
}

export default connect(mapStateToProps)(PlaylistCompact);
