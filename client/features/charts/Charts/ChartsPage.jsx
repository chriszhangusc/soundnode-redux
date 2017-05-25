import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  loadChartsPage,
  changeGenre,
  clearChartsState,
} from 'client/features/charts/chartsActions';
import { changeVisiblePlaylistName } from 'client/features/playlist/playlistActions';
import { DEFAULT_GENRE } from 'client/features/charts/chartsConsts';
import { getGenreList } from 'client/features/charts/chartsSelectors';
import { CHARTS_ROUTE } from 'client/common/constants/RouteConsts';
import { Grid } from 'react-bootstrap';

import ChartsTracks from '../ChartsTracks';
import ChartsGenreList from '../ChartsGenreList';
import ChartsTitle from '../ChartsTitle';

class ChartsPageContainer extends Component {
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

  /* Change to different genre routes */
  componentWillReceiveProps(nextProps) {
    const curGenre = this.props.match.params.genre;
    const nextGenre = nextProps.match.params.genre;

    // If curGenre is undefined, it means we are coming from other routes into Charts route,
    // we only need to do fetching in componentWillMount.
    if (curGenre !== nextGenre && curGenre) {
      this.onPageMountOrChange(nextProps);
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(clearChartsState());
  }

  onPageMountOrChange({ match, history, dispatch, genres }) {
    const genreFromUrl = match.params.genre;
    const valid = genres.filter(item => item.link === genreFromUrl).length > 0;

    // invalid genre like this: http://localhost:3000/top50/All-Music/adfasdfasdfasdf
    const genre = valid ? genreFromUrl : DEFAULT_GENRE;
    // Redirect to default route if the genre is not valid.
    if (!valid) history.push(`${CHARTS_ROUTE}/${DEFAULT_GENRE}`);
    dispatch(changeVisiblePlaylistName(genre));
    dispatch(changeGenre(genre));
    dispatch(loadChartsPage(genre));
  }

  render() {
    return (
      <Grid fluid>
        <ChartsTitle />
        <ChartsGenreList />
        <ChartsTracks />
      </Grid>
    );
  }
}

// Container prop validation required here?
ChartsPageContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    genres: getGenreList(state),
  };
}

export default connect(mapStateToProps)(ChartsPageContainer);
