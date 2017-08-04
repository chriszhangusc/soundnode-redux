import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { truncateWidth } from 'app/css/styleUtils';
import PlaylistTooltips from './PlaylistTooltips';

const PlaylistItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 13px;
  height: 50px;
  line-height: 50px;
  max-height: 50px;
  min-height: 50px;
  color: ${props => props.theme.fontColor};
  border-bottom: 1px solid ${props => props.theme.separatorColorDark};
  padding: 12px 20px;
  white-space: nowrap;
  cursor: pointer;
  background-color: ${props => props.active && props.theme.separatorColorDark};
  &:hover {
    background-color: ${props => props.theme.separatorColorDark};
  }
`;

const PlaylistItemTitle = styled.span`
  flex-grow: 1;
  width: 200px;
  ${truncateWidth('200px')};
  text-align: left;
  margin-right: 10px;
  color: ${props => props.theme.fontColor};
  font-size: 1rem;
  & span {
    margin: 10px;
  }
`;

const PlaylistItemArtistName = PlaylistItemTitle.extend`
  color: ${props => props.theme.fontColorSub};
  width: 140px;
  ${truncateWidth('140px')};
`;

function PlaylistRow({
  title,
  artistName,
  liked,
  active,
  index,
  trackId,
  handleupdateActiveTrackId,
  handleLikeSong,
  handleUnlikeSong,
}) {
  return (
    <PlaylistItem
      active={active}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!active) handleupdateActiveTrackId();
      }}
    >
      <PlaylistItemTitle title={title}>{`${index}. ${title}`}</PlaylistItemTitle>
      <PlaylistItemArtistName title={artistName}>
        by: {artistName}
      </PlaylistItemArtistName>
      <PlaylistTooltips index={index} trackId={trackId} />
    </PlaylistItem>
  );
}

PlaylistRow.propTypes = {
  handleupdateActiveTrackId: PropTypes.func.isRequired,
  handleLikeSong: PropTypes.func.isRequired,
  handleUnlikeSong: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  liked: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

export default PlaylistRow;
