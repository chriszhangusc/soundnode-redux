import React, { PropTypes } from 'react';
import { List } from 'immutable';
import PlaylistItemContainer from '../containers/PlaylistItemContainer';

const Playlist = ({
  playlistTrackIds,
  playlistHidden
 }) => {
  return (
    <div className={`col-sm-2 playlist ${playlistHidden ? '' : 'show'}`} >
      <div className="playlist-container">
        <div className="playlist-title">
          <span className="labelColumn">TRACKS</span>
          |
          <span className="labelColumn">ARTIST</span>
        </div>
        <ul className="playlist-list">
          {
            playlistTrackIds.map(
              (trackId, idx) =>
                <PlaylistItemContainer
                  trackId={trackId}
                  index={idx + 1}
                  key={trackId}
                />
            )
          }
        </ul>
      </div>
    </div>
  );
};

Playlist.propTypes = {
  playlistHidden: PropTypes.bool,
  playlistTrackIds: PropTypes.instanceOf(List)
};

export default Playlist;
