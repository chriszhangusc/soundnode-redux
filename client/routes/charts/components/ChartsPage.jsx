import React from 'react';
import ChartsListContainer from '../containers/ChartsListContainer';
import GenreCharts from './GenreCharts';

const ChartsPage = () => (
  <div className="container">
    <GenreCharts />
    <ChartsListContainer />
  </div>
);

export default ChartsPage;
