import React from 'react';
import ChartsListContainer from '../containers/ChartsListContainer';
import GenreCharts from './GenreCharts';

const ChartsPage = () => (
  <div className="container-fluid">
    <GenreCharts />
    <ChartsListContainer />
  </div>
);

export default ChartsPage;
