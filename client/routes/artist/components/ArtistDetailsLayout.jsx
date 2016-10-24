import React, { PropTypes } from 'react';
import Spinner from 'client/components/Spinner';
import TrackListContainer from '../container/TrackListContainer';
import ArtistInfoContainer from '../container/ArtistInfoContainer';

const ArtistDetailsLayout = ({ fetching, artistId }) => {
  if (fetching) return <Spinner />;
  return (
    <div className="container">
      <ArtistInfoContainer artistId={artistId} />

      <div className="artist-tracks-container">
        <div className="artist-tracks-title">
          <h3>Tracks:</h3>
          <TrackListContainer />
        </div>
      </div>
    </div>
  );
};

ArtistDetailsLayout.propTypes = {
  fetching: PropTypes.bool,
  artistId: PropTypes.number
};

export default ArtistDetailsLayout;
