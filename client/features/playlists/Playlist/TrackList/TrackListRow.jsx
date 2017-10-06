import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TrackImage from 'common/components/images/TrackImage';
import { formatDurationCompact, formatNumberCompact } from 'common/utils/formatUtils';
import { getUserByTrackId } from 'features/entities/entitiesSelectors';

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

const TableCell = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: ${props => props.width};
`;

const Id = styled.div`
  display: flex;
  color: ${props => props.theme.colors.fontColorSub};
  align-items: center;
  justify-content: center;
  width: 30px;
`;

function TrackListRow({ track, trackArtist, id }) {
  console.log(track);
  return (
    <TrackItem key={track.id}>
      <Id>{id}</Id>
      <TableCell width="40%">
        <TrackImage src={track.artworkUrl} size="tiny" mr="10px" />
        <TrackTitle>{track.title}</TrackTitle>
      </TableCell>
      <TableCell width="30%">
        <TrackTitle>{trackArtist.username}</TrackTitle>
      </TableCell>
      <TableCell width="15%">
        <TrackTitle>{formatDurationCompact(track.duration)}</TrackTitle>
      </TableCell>
      <TableCell width="10%">
        <TrackTitle>{formatNumberCompact(track.playbackCount)}</TrackTitle>
      </TableCell>
    </TrackItem>
  );
}

TrackListRow.propTypes = {
  track: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
};

function mapStateToProps(state, { track }) {
  return {
    trackArtist: getUserByTrackId(state, track.id),
  };
}

export default connect(mapStateToProps)(TrackListRow);
