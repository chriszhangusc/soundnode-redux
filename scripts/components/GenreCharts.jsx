import React from 'react';
import { GENRES } from '../constants/SongConstants';

const renderGenres = () => GENRES.map(
  genre => <button key={genre} className="button inline">{genre.toUpperCase()}</button>
);

const GenreCharts = () => (
  <div className="genre-charts">
    <h1>Top 50 - All Music</h1>
    <div className="genre-selector" >
      <h3 className="title">Charts By Genre</h3>
      { renderGenres() }
    </div>
  </div>
);

export default GenreCharts;
