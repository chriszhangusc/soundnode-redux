import React, { PropTypes } from 'react';
import Spinner from 'client/components/Spinner';
import ArtistTrackListContainer from '../container/ArtistTrackListContainer';
import ArtistInfoContainer from '../container/ArtistInfoContainer';

const ArtistDetailsLayout = ({ fetching, artistId, trackCount }) => {
  if (fetching) return <Spinner />;
  return (
    <div className="container">
      <ArtistInfoContainer artistId={artistId} />

      <div className="artist-tracks-container">
        <div className="artist-tracks-title">
          <h3>Tracks ({ trackCount }) :</h3>
          <ArtistTrackListContainer />
        </div>
      </div>
    </div>
  );
};

ArtistDetailsLayout.propTypes = {
  fetching: PropTypes.bool,
  artistId: PropTypes.number,
  trackCount: PropTypes.string,
};

export default ArtistDetailsLayout;
