import React from 'react';
import { connect } from 'react-redux';
import TrackImage from '@soundnode-redux/client/src/common/components/images/TrackImage';
import ColumnTitleWrapper from '@soundnode-redux/client/src/common/components/layouts/ColumnTitleWrapper';
import { truncateMaxWidth } from '@soundnode-redux/client/src/app/css/styleUtils';
import styled from 'styled-components';
import Icon from '@soundnode-redux/client/src/common/components/icons/Icon';
import IconButton from '@soundnode-redux/client/src/common/components/buttons/IconButton';
import Spinner from '@soundnode-redux/client/src/common/components/spinners/HalfCircleRotate';
import { getTracksByPlaylistId } from '@soundnode-redux/client/src/features/entities/entitiesSelectors';

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

function PlaylistCompact({ playlistTitle, playlistTracks, onClick, isAdded, requestInProgress }) {
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
      {requestInProgress ? (
        <Spinner color="white" />
      ) : (
        <IconButton iconName={isAdded ? 'check' : 'plus'} iconSize="lg" onClick={onClick} />
      )}
    </Wrapper>
  );
}

function mapStateToProps(state, { playlistId }) {
  return {
    playlistTracks: getTracksByPlaylistId(state, playlistId),
  };
}

export default connect(mapStateToProps)(PlaylistCompact);
