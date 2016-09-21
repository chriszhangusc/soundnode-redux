import React from 'react';
import Toolbar from './Toolbar';
import SongCardListContainer from '../containers/SongCardListContainer';
import PlayerContainer from '../containers/Player/PlayerContainer';

export default function Main() {
  return (
    <div className="songs">
      <Toolbar />
      <SongCardListContainer />
      <PlayerContainer />
    </div>
  );
}
