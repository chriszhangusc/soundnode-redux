import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { truncateWidth } from 'app/css/styleUtils';
import PlayQueueTooltips from './PlayQueueTooltips';

const PlayQueueItem = styled.li`
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 50px;
  max-height: 50px;
  min-height: 50px;
  color: ${props => props.theme.colors.fontColor};
  border-bottom: 1px solid ${props => props.theme.colors.separatorDark};
  padding: 12px 20px;
  white-space: nowrap;
  cursor: pointer;
  background-color: ${props => props.active && props.theme.colors.separatorDark};
  &:hover {
    background-color: ${props => props.theme.colors.separatorDark};
  }
`;

const PlayQueueItemTitle = styled.span`
  flex-grow: 1;
  width: 200px;
  ${truncateWidth('200px')};
  text-align: left;
  margin-right: 10px;
  color: ${props => props.theme.colors.fontColor};
  font-size: 1rem;
  & span {
    margin: 10px;
  }
`;

const PlayQueueItemArtistName = PlayQueueItemTitle.extend`
  color: ${props => props.theme.colors.fontColorSub};
  width: 140px;
  ${truncateWidth('140px')};
`;

function PlayQueueRow({
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
    <PlayQueueItem
      active={active}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!active) handleupdateActiveTrackId();
      }}
    >
      <PlayQueueItemTitle title={title}>{`${index}. ${title}`}</PlayQueueItemTitle>
      <PlayQueueItemArtistName title={artistName}>
        by: {artistName}
      </PlayQueueItemArtistName>
      <PlayQueueTooltips index={index} trackId={trackId} />
    </PlayQueueItem>
  );
}

PlayQueueRow.propTypes = {
  handleupdateActiveTrackId: PropTypes.func.isRequired,
  handleLikeSong: PropTypes.func.isRequired,
  handleUnlikeSong: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  liked: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

export default PlayQueueRow;
