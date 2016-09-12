import React from 'react';
import Toolbar from './Toolbar';
import SongCardsContainer from '../containers/SongCardsContainer';
import PlayerContainer from '../containers/PlayerContainer'

const Main = (props) => (
  <div className='songs'>
    <Toolbar />
    <SongCardsContainer {...props} />
    <PlayerContainer {...props} />
  </div>
)

export default Main;
