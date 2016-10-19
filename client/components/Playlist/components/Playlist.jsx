import React, { PropTypes } from 'react';
import Track from 'client/models/Track';
import PlaylistItemContainer from '../containers/PlaylistItemContainer';

const Playlist = ({
  playlistTracks,
  playlistShown
 }) => {
  return (
    <div className={`col-sm-2 playlist ${playlistShown ? 'show' : ''}`} >
      <div className="playlist-container">
        <div className="playlist-title">
          <span className="labelColumn">TRACKS</span>
          |
          <span className="labelColumn">ARTIST</span>
        </div>
        <ul className="playlist-list">
          {
            playlistTracks.map(
              (track, idx) => <PlaylistItemContainer track={track} index={idx + 1} key={idx} />
            )
          }
        </ul>
      </div>
    </div>
  );
};

Playlist.propTypes = {
  playlistShown: PropTypes.bool,
  playlistTracks: PropTypes.arrayOf(PropTypes.shape(Track))
};

export default Playlist;
