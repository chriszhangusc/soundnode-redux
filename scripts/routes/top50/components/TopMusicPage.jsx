import React from 'react';
import SongCardListContainer from '../containers/SongCardListContainer';
import GenreCharts from './GenreCharts';

const TopMusicPage = () => (
  <div className="container">
    <GenreCharts />
    <SongCardListContainer />
  </div>
);

export default TopMusicPage;
