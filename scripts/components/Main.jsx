import React from 'react';
import Toolbar from './Toolbar';
import SongCardListContainer from '../containers/SongCardListContainer';
import PlayerContainer from '../containers/Player/PlayerContainer';
import Sidebar from './Sidebar';
export default function Main() {
  return (
    <div>
      <Sidebar />
      <div className="content">
        <SongCardListContainer />
        <PlayerContainer />
      </div>
    </div>
  );
}
// export default function Main() {
//   return (
//     <div className="songs">
//       <Toolbar />
//       <Sidebar />
//       <SongCardListContainer />
//       <PlayerContainer />
//     </div>
//   );
// }
