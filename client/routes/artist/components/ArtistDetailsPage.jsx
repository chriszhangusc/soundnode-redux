import React from 'react';
import PropTypes from 'prop-types';
import ArtistTrackListContainer from '../container/ArtistTrackListContainer';
import ArtistInfoContainer from '../container/ArtistInfoContainer';

const ArtistDetailsPage = ({ artistId, trackCount }) => {
  return (
    <div className="container">
      <ArtistInfoContainer artistId={artistId} />
      <div className="artist-tracks-container">
        <div className="artist-tracks-title">
          <h3>Tracks ({trackCount}) :</h3>
          <ArtistTrackListContainer />
        </div>
      </div>
    </div>
  );
};

ArtistDetailsPage.propTypes = {
  fetching: PropTypes.bool,
  artistId: PropTypes.number,
  trackCount: PropTypes.string,
};

ArtistDetailsPage.defaultProps = {
  fetching: false,
  artistId: null,
  trackCount: '0',
};

export default ArtistDetailsPage;
