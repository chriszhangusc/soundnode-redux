import React from 'react';
import Toolbar from './Toolbar';
import VisibleSongCardList from '../containers/VisibleSongCardList';
import PlayerContainer from '../containers/PlayerContainer'

const Main = () => (
  <div className='songs'>
    <Toolbar />
    <VisibleSongCardList />
    <PlayerContainer />
  </div>
)

export default Main;
