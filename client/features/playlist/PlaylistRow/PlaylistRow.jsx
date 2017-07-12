import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  FONT_COLOR_PRIMARY,
  SEPARATOR_COLOR_CLEAN,
  SEPARATOR_COLOR_DARK,
  FONT_COLOR_SECONDARY,
  LIGHT_GRAY,
} from 'app/css/colors';
import PlaylistTooltips from './PlaylistTooltips';

const PlaylistItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 13px;
  height: 50px;
  line-height: 50px;
  max-height: 50px;
  min-height: 50px;
  color: ${FONT_COLOR_PRIMARY};
  border-bottom: 1px solid ${SEPARATOR_COLOR_DARK};
  padding: 12px 20px;
  white-space: nowrap;
  cursor: pointer;
  background-color: ${props => props.active && SEPARATOR_COLOR_DARK};
  &:hover {
    background-color: ${SEPARATOR_COLOR_DARK};
  }
`;

const PlaylistItemTitle = styled.span`
  flex-grow: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 180px;
  text-align: left;
  margin-right: 10px;
  color: ${LIGHT_GRAY};
  font-size: 1rem;
  & span {
    margin: 10px;
  }
`;

const PlaylistItemArtistName = styled.span`
  flex-grow: 1;
  
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: left;
  color: ${FONT_COLOR_SECONDARY};
    width: 140px;
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
      <PlaylistItemArtistName title={artistName}>by: {artistName}</PlaylistItemArtistName>
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
