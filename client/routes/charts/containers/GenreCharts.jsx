import React from 'react';
import PropTypes from 'prop-types';
import Title from 'client/components/Title';
import LinkButton from 'client/components/Buttons/LinkButton';
import { connect } from 'react-redux';
import { GENRES, CHARTS_MAIN_TITLE_PREFIX, CHARTS_SUBTITLE } from 'client/constants/ChartsConsts';
import { getChartsGenre } from 'client/redux/modules/charts/selectors';

/* Since we only connect to store for playlist name, so no need to wrap it in a container */
/* chartsGenre is fetched from redux store directly */
const renderGenres = () => GENRES.map(
  genre => (<LinkButton
    key={genre.link}
    to={`/charts/${genre.link}`}
  >{genre.title}</LinkButton>),
);

const GenreCharts = ({ chartsGenre }) => (
  <div className="charts-header">
    <Title text={`${CHARTS_MAIN_TITLE_PREFIX}${GENRES.find(g => g.link === chartsGenre).title}`} />
    <div className="genre-list" >
      <h3 className="title">{CHARTS_SUBTITLE}</h3>
      {renderGenres()}
    </div>
  </div>
);

GenreCharts.propTypes = {
  chartsGenre: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  chartsGenre: getChartsGenre(state),
});

export default connect(mapStateToProps)(GenreCharts);
