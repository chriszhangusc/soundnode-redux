import React, { PropTypes } from 'react';
import { List } from 'immutable';
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

Playlist.propTypes = {
  playlistHidden: PropTypes.bool,
  playlistTrackIds: PropTypes.instanceOf(List),
  handleClearPlayQueue: PropTypes.func,
};

export default Playlist;
