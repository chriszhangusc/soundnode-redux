import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { GENRES } from 'client/constants/ChartsConsts';
import { getChartsGenre } from 'client/redux/modules/charts';

/* Since we only connect to store for playlist name, so no need to wrap it in a container */
/* chartsGenre is fetched from redux store directly */
const renderGenres = () => GENRES.map(
  genre => (<Link
    key={genre.link}
    className="button inline"
    to={`/charts/${genre.link}`}
  >{genre.title}</Link>)
);

const GenreCharts = ({ chartsGenre }) => (
  <div className="charts-header">
    <h1>Top 50 - { GENRES.find(g => g.link === chartsGenre).title }</h1>
    <div className="genre-list" >
      <h3 className="title">Charts By Genre</h3>
      {renderGenres()}
    </div>
  </div>
);

GenreCharts.propTypes = {
  chartsGenre: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    chartsGenre: getChartsGenre(state),
  };
}

export default connect(mapStateToProps)(GenreCharts);
