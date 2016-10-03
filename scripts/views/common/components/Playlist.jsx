import React, { PropTypes } from 'react';

const Playlist = ({ playerPlaylistSongs, currentSongId, handleChangeSong }) => {
  return (
    <div className="playlist-container">
      <div className="playlist-title">
        <span className="labelColumn">TRACKS</span>
        |
        <span className="labelColumn">ARTIST</span>
      </div>
      <ul className="playlist-list">
        {
          playerPlaylistSongs.map((song, idx) => {
            return (
            <li
              className={`playlist-item ${currentSongId === song.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                if (currentSongId !== song.id) handleChangeSong(song)
              }}
              key={idx}
            >
              <span className="playlist-item-index">{`${idx + 1}.`}</span>
              <span className="playlist-item-title">{ song.title }</span>
              <span className="playlist-item-username">by: {song.user.username}</span>
              <div className="playlist-item-options-container">
                <i className="fa fa-ellipsis-v" />
                <div className="playlist-item-popup-arrow" />
                <ul className="playlist-item-options-list">
                  <li className="playlist-item-options-list_button">Go to track</li>
                  <li className="playlist-item-options-list_button">Like</li>
                  <li className="playlist-item-options-list_button">Add to playlist</li>
                  <li className="playlist-item-options-list_button">Remove</li>
                  <li className="playlist-item-options-list_button">Repost</li>
                </ul>
              </div>
            </li>);
          })
        }
      </ul>
    </div>
  );
};

Playlist.propTypes = {
  currentSongId: PropTypes.number,
  playerPlaylistSongs: PropTypes.array,
  handleChangeSong: PropTypes.func
};

export default Playlist;

//
// <div className="queueListView">
//
//     <ul className="queueListView_list">
//         <li className="queueListView_list_itemTitle">
//             <span className="labelColumn">TRACKS</span>
//             |
//             <span className="labelColumn">ARTIST</span>
//         </li>
//         <li className="queueListView_list_item"
//             ng-repeat="item in data"
//             song
//             data-song-url="{{ item.songUrl }}"
//             data-song-thumbnail="{{ item.songThumbnail }}"
//             data-song-title="{{ item.songTitle }}"
//             data-song-user="{{ item.songUser }}"
//             data-song-id="{{ item.songId }}"
//             ng-click="activateTrackInQueue($event)">
//
//             <small className="queueListView_list_item_index">{{ $index + 1 }}</small>
//             <span className="queueListView_list_item_title selectable-text" title="{{ item.songTitle }}">{{ item.songTitle }}</span>
//             <span className="queueListView_list_item_user" title="by: {{ item.songUser }}">by: {{ item.songUser }} </span>
//             <div className="playlist-item-options-container"
//                  ng-className="{ active: hover }"
//                  ng-mouseover="menuPosition($event); hover = true"
//                  ng-mouseleave="hover = false" >
//                 <i className="fa fa-ellipsis-v"></i>
//                 <div className="playlist-item-options-container_arrow"></div>
//                 <ul className="playlist-item-options-list">
//                     <li className="playlist-item-options-list_button" ng-click="remove($event); $event.stopPropagation();">Remove</li>
//                     <li className="playlist-item-options-list_button" ng-click="like($event); $event.stopPropagation();">Like</li>
//                     <li className="playlist-item-options-list_button" ng-click="repost($event); $event.stopPropagation();">Repost</li>
//                     <li className="playlist-item-options-list_button" ng-click="addToPlaylist($event); $event.stopPropagation();">Add to playlist</li>
//                     <li className="playlist-item-options-list_button" ng-click="gotoTrack($event); $event.stopPropagation();">Go to track</li>
//                 </ul>
//             </div>
//
//         </li>
//     </ul>
// </div>
// <!-- Song list wrapper / end -->
//
// </div>
