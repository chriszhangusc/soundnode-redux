import React from 'react';

const Playlist = () => {
  return (
    <div className="playlist-container">
      <div className="playlist-title">
        <span className="labelColumn">TRACKS</span>
        |
        <span className="labelColumn">ARTIST</span>
      </div>
      <ul className="playlist-list">
        <li className="playlist-item">
          <span className="playlist-item-index">1.</span>
          <span className="playlist-item-title">Young Mother Fucker</span>
          <span className="playlist-item-username">by: Huachao Zhang</span>
        </li>
        <li className="playlist-item">
          <span className="playlist-item-index">2.</span>
          <span className="playlist-item-title">Always analyzing</span>
          <span className="playlist-item-username">by: Vencent</span>
        </li>
        <li className="playlist-item">
          <span className="playlist-item-index">3.</span>
          <span className="playlist-item-title">HJ Auto Group is Shit</span>
          <span className="playlist-item-username">by: Holly Shit</span>
        </li>
      </ul>
    </div>
  );
};

export default Playlist;

//
// <div class="queueListView">
//
//     <ul class="queueListView_list">
//         <li class="queueListView_list_itemTitle">
//             <span class="labelColumn">TRACKS</span>
//             |
//             <span class="labelColumn">ARTIST</span>
//         </li>
//         <li class="queueListView_list_item"
//             ng-repeat="item in data"
//             song
//             data-song-url="{{ item.songUrl }}"
//             data-song-thumbnail="{{ item.songThumbnail }}"
//             data-song-title="{{ item.songTitle }}"
//             data-song-user="{{ item.songUser }}"
//             data-song-id="{{ item.songId }}"
//             ng-click="activateTrackInQueue($event)">
//
//             <small class="queueListView_list_item_index">{{ $index + 1 }}</small>
//             <span class="queueListView_list_item_title selectable-text" title="{{ item.songTitle }}">{{ item.songTitle }}</span>
//             <span class="queueListView_list_item_user" title="by: {{ item.songUser }}">by: {{ item.songUser }} </span>
//             <div class="queueListView_list_item_options"
//                  ng-class="{ active: hover }"
//                  ng-mouseover="menuPosition($event); hover = true"
//                  ng-mouseleave="hover = false" >
//                 <i class="fa fa-ellipsis-v"></i>
//                 <div class="queueListView_list_item_options_arrow"></div>
//                 <ul class="queueListView_list_item_options_list">
//                     <li class="queueListView_list_item_options_list_button" ng-click="remove($event); $event.stopPropagation();">Remove</li>
//                     <li class="queueListView_list_item_options_list_button" ng-click="like($event); $event.stopPropagation();">Like</li>
//                     <li class="queueListView_list_item_options_list_button" ng-click="repost($event); $event.stopPropagation();">Repost</li>
//                     <li class="queueListView_list_item_options_list_button" ng-click="addToPlaylist($event); $event.stopPropagation();">Add to playlist</li>
//                     <li class="queueListView_list_item_options_list_button" ng-click="gotoTrack($event); $event.stopPropagation();">Go to track</li>
//                 </ul>
//             </div>
//
//         </li>
//     </ul>
// </div>
// <!-- Song list wrapper / end -->
//
// </div>
