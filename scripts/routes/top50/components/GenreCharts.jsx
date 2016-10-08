import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { GENRES } from '../../../constants/SongConstants';
import { getVisiblePlaylistName } from '../../../modules/reducers';

/* Since we only connect to store for playlist name, so no need to wrap it in a container */
const renderGenres = () => GENRES.map(
  genre =>
    <Link
      key={genre}
      className="button inline"
      to={`/top50/${genre}`}
    >{genre.toUpperCase()}</Link>
);

const GenreCharts = ({ visiblePlaylistName }) => (
  <div className="genre-charts">
    <h1>Top 50 - { visiblePlaylistName.toUpperCase() }</h1>
    <div className="genre-selector" >
      <h3 className="title">Charts By Genre</h3>
      { renderGenres() }
    </div>
  </div>
);

GenreCharts.propTypes = {
  visiblePlaylistName: React.PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    visiblePlaylistName: getVisiblePlaylistName(state)
  };
}

export default connect(mapStateToProps)(GenreCharts);
