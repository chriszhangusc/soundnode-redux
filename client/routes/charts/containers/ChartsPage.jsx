import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadChartsPage, changeGenre } from 'client/redux/modules/charts/actions';
import { changeVisiblePlaylistName } from 'client/redux/modules/playlist/actions';
import { GENRES, DEFAULT_GENRE, CHARTS_MAIN_TITLE_PREFIX, CHARTS_SUBTITLE } from 'client/constants/ChartsConsts';

import ChartsSongCardListContainer from './ChartsSongCardListContainer';
import GenreCharts from './GenreCharts';

class ChartsPage extends Component {

  // ES7 ESLint will complain not sure why
  // static propTypes = {
  //   match: PropTypes.object.isRequired,
  // };

  constructor(props) {
    super(props);
    this.onPageMountOrChange = this.onPageMountOrChange.bind(this);
  }

  /* First load */
  componentWillMount() {
    this.onPageMountOrChange(this.props);
  }
  /* Change to different routes */
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.genre !== this.props.match.params.genre) {
      this.onPageMountOrChange(nextProps);
    }
  }

  onPageMountOrChange(props) {
    const { match, history, dispatch } = props;
    const genreFromUrl = match.params.genre;
    const valid = GENRES.filter(item => item.link === genreFromUrl).length > 0;

    // invalid genre like this: http://localhost:3000/top50/All-Music/adfasdfasdfasdf
    const genre = valid ? genreFromUrl : DEFAULT_GENRE;
    if (!valid) history.push(`/charts/${DEFAULT_GENRE}`);
    dispatch(changeVisiblePlaylistName(genre));
    dispatch(changeGenre(genre));
    dispatch(loadChartsPage(genre));
  }

  render() {
    return (
      <div className="container-fluid">
        <GenreCharts />
        <ChartsSongCardListContainer />
      </div>
    );
  }
}


ChartsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect()(ChartsPage);
