import React from 'react';
import Toolbar from './Toolbar';
import VisibleSongCardList from '../containers/VisibleSongCardList';
import VisiblePlayer from '../containers/player/VisiblePlayer'

const Main = () => (
  <div className='songs'>
    <Toolbar />
    <VisibleSongCardList />
    <VisiblePlayer />
  </div>
)

export default Main;
