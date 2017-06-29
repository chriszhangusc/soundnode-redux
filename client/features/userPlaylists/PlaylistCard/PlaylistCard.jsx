import React from 'react';
import PropTypes from 'prop-types';
import MaterialCard from 'common/components/MaterialCard/MaterialCard';
import PlaylistCardImage from './PlaylistCardImage';
import PlaylistCardDetails from './PlaylistCardDetails';
import PlaylistCardControls from './PlaylistCardControls';

function PlaylistCard({ playlistId }) {
  return (
    <MaterialCard active={false}>
      <PlaylistCardImage playlistId={playlistId} />
      <PlaylistCardDetails playlistId={playlistId} />
      <PlaylistCardControls playlistId={playlistId} />
    </MaterialCard>
  );
}

PlaylistCard.propTypes = {
  playlistId: PropTypes.number.isRequired,
};

export default PlaylistCard;
