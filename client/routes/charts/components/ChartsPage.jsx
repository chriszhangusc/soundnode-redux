import React from 'react';
import ChartsListContainer from '../containers/ChartsListContainer';
import GenreCharts from './GenreCharts';

const TopMusicPage = () => (
  <div className="container">
    <GenreCharts />
    <ChartsListContainer />
  </div>
);

export default TopMusicPage;
