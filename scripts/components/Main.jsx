import React from 'react';
import SongCardListContainer from '../containers/SongCardListContainer';
import PlayerContainer from '../containers/Player/PlayerContainer';
import Sidebar from './Sidebar';
import GenreCharts from './GenreCharts';

export default function Main() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2 sidebar">
          <Sidebar />
        </div>
        <div className="col-sm-8 col-sm-offset-2">
          <div className="container">
            <GenreCharts />
            <SongCardListContainer />
            <PlayerContainer />
          </div>
        </div>
      </div>
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
