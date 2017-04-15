import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import MagicButton from 'client/components/MagicButton';
import { defaultEventHandlerFactory } from 'client/utils/FactoryUtils';
import PlaylistItemContainer from '../containers/PlaylistItemContainer';

function Playlist({ playlistTrackIds, playlistHidden, handleClearPlayQueue }) {
  return (
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
                />,
            )
          }
        </ul>
      </div>
    </div>
  );
}

Playlist.defaultProps = {
  playlistHidden: true,
  playlistTrackIds: [],
  handleClearPlayQueue: defaultEventHandlerFactory('handleClearPlayQueue'),
};

Playlist.propTypes = {
  playlistHidden: PropTypes.bool,
  playlistTrackIds: PropTypes.array,
  handleClearPlayQueue: PropTypes.func,
};

export default Playlist;
