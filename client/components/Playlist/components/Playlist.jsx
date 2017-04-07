import React, { PropTypes } from 'react';
import shortid from 'shortid';
import MagicButton from 'client/components/MagicButton';
import PlaylistItemContainer from '../containers/PlaylistItemContainer';

const Playlist = ({
  playlistTrackIds,
  playlistHidden,
  handleClearPlayQueue,
 }) => (
  <div className={`col-sm-2 playlist ${playlistHidden ? '' : 'show'}`} >
    <div className="playlist-container">
      <div className="playlist-title">
        <span className="labelColumn">TRACKS</span> | <span className="labelColumn">ARTIST</span>
        <div className="playlist-title-icon-container">
          <MagicButton
            btnClassName="icon-button"
            iconClassName="fa fa-trash"
            title="Clear play queue"
            onClick={handleClearPlayQueue}
          />
        </div>
      </div>
      <ul className="playlist-list">
        {
          playlistTrackIds && playlistTrackIds.map(
            (trackId, idx) =>
              <PlaylistItemContainer
                trackId={trackId}
                index={idx + 1}
                key={shortid.generate()}
              />
          )
        }
      </ul>
    </div>
  </div>
);

Playlist.defaultProps = {
  playlistHidden: true,
  playlistTrackIds: [],
  handleClearPlayQueue: () => {},
};

Playlist.propTypes = {
  playlistHidden: PropTypes.bool,
  playlistTrackIds: PropTypes.array,
  handleClearPlayQueue: PropTypes.func,
};

export default Playlist;
