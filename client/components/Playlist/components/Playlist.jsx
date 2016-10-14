import React, { PropTypes } from 'react';
import Track from 'client/models/Track';
import PlaylistItemContainer from '../containers/PlaylistItemContainer';

const Playlist = ({
  playlistTracks,
  isPlaylistShown
 }) => {
  return (
    <div className={`col-sm-2 playlist ${isPlaylistShown ? 'show' : ''}`} >
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
  isPlaylistShown: PropTypes.bool,
  // Not 100% sure if this is the right way.
  playlistTracks: PropTypes.arrayOf(PropTypes.shape(Track))
};

export default Playlist;
