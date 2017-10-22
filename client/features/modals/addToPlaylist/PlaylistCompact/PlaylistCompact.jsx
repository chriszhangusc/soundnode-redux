import React from 'react';
import TrackImage from 'common/components/images/TrackImage';
import ColumnTitleWrapper from 'common/components/layouts/ColumnTitleWrapper';
import { truncateMaxWidth } from 'app/css/styleUtils';
import styled from 'styled-components';
import Icon from 'common/components/icons/Icon';
import IconButton from 'common/components/buttons/IconButton';

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

function PlaylistCompact({ track, playlist, onClick, isAdded }) {
  const { title, tracks, trackCount } = playlist;
  console.log('Playlist Render');
  return (
    <Wrapper>
      <TrackImage src={tracks[0] && tracks[0].artworkUrl} size="mini" />
      <ColumnTitleWrapper>
        <PlaylistTitle>{title}</PlaylistTitle>
        <PlaylistSubtitle>
          <Icon iconName="list" /> {trackCount}
        </PlaylistSubtitle>
      </ColumnTitleWrapper>
      <ActionButtonWrapper>
        <IconButton
          iconName={isAdded ? 'check' : 'plus'}
          iconSize="lg"
          onClick={onClick}
        />
      </ActionButtonWrapper>
    </Wrapper>
  );
}

export default PlaylistCompact;
