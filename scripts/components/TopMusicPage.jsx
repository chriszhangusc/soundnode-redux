import React from 'react';
import SongCardListContainer from '../containers/SongCardListContainer';
import PlayerContainer from '../containers/Player/PlayerContainer';
import GenreCharts from './GenreCharts';

export default function Main() {
  return (
    <div className="container">
      <GenreCharts />
      <SongCardListContainer />
      <PlayerContainer />
    </div>
  );
}
// <Sidebar />
// <SongCardListContainer />
// <PlayerContainer />

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
