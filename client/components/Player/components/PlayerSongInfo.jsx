import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Track from 'client/models/Track';
import defaultArtworkImage from 'assets/images/default-artwork.png';
import { formatTitle } from 'client/utils/FormatUtils';

const PlayerSongInfo = ({ track }) => {
console.log('Render: PlayerSongInfo');
  const artist = track.getArtist();
  const trackId = track.getId();
  const artistId = artist.getId();
  return (
    <div className="player-section player-info">
      <img
        role="presentation"
        className="player-image"
        src={track.getArtworkUrl() || defaultArtworkImage}
      />
      <div className="player-song-card-details">
        <Link to={`/track/${trackId}`} className="song-card-title">
          {track.getTitle()}
        </Link>
        <Link to={`/artist/${artistId}`} className="song-card-username">
          {formatTitle(artist.getUsername())}
        </Link>
      </div>
    </div>
  );
};

PlayerSongInfo.propTypes = {
  track: PropTypes.instanceOf(Track)
};


export default PlayerSongInfo;
