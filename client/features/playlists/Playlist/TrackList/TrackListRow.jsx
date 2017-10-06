import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TrackImage from 'common/components/images/TrackImage';
import { formatDurationCompact, formatNumberCompact } from 'common/utils/formatUtils';
import { getUserByTrackId } from 'features/entities/entitiesSelectors';
import RouterLink from 'common/components/links/RouterLink';
import { USER_PROFILE_ROUTE, TRACK_PROFILE_ROUTE } from 'common/constants/routeConsts';

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

const TableItem = styled.span`
  font-size: 0.95rem;
  max-width: 100%;
`;

const TableItemLink = RouterLink.extend`
  font-size: 0.95rem;
  max-width: 100%;
  &:hover {
    text-decoration: underline;
  }
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
  return (
    <TrackItem key={track.id}>
      <Id>{id}</Id>
      <TableCell width="40%">
        <TrackImage src={track.artworkUrl} size="tiny" mr="10px" />
        <TableItemLink to={`${TRACK_PROFILE_ROUTE}/${track.id}`}>{track.title}</TableItemLink>
      </TableCell>
      <TableCell width="30%">
        <TableItemLink to={`${USER_PROFILE_ROUTE}/${trackArtist.id}`}>
          {trackArtist.username}
        </TableItemLink>
      </TableCell>
      <TableCell width="15%">
        <TableItem>{formatDurationCompact(track.duration)}</TableItem>
      </TableCell>
      <TableCell width="10%">
        <TableItem>{formatNumberCompact(track.playbackCount)}</TableItem>
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
