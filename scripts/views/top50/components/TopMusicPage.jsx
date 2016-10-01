import React from 'react';
import SongCardListContainer from '../containers/SongCardListContainer';
// import PlayerContainer from '../containers/Player/PlayerContainer';
import PlayerContainer from '../../player/containers/PlayerContainer';
import GenreCharts from './GenreCharts';

const TopMusicPage = () => (
  <div className="container">
    <GenreCharts />
    <SongCardListContainer />
    <PlayerContainer />
  </div>
);

export default TopMusicPage;
