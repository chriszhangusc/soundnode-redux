import React from 'react';
import PropTypes from 'prop-types';
import Card from 'common/components/Card/Card';
import PlaylistCardImage from './PlaylistCardImage';
import PlaylistCardDetails from './PlaylistCardDetails';
import PlaylistCardControls from './PlaylistCardControls';

function PlaylistCard({ playlistId }) {
  return (
    <Card active={false}>
      <PlaylistCardImage playlistId={playlistId} />
      <PlaylistCardDetails playlistId={playlistId} />
      <PlaylistCardControls playlistId={playlistId} />
    </Card>
  );
}

PlaylistCard.propTypes = {
  playlistId: PropTypes.number.isRequired,
};

export default PlaylistCard;
