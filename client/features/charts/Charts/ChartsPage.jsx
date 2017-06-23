import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  loadChartsPage,
  changeGenre,
  clearChartsState,
} from 'client/features/charts/chartsActions';
import { changeVisiblePlaylistName } from 'client/features/playlist/playlistActions';
import { Grid } from 'react-bootstrap';
import ChartsTracks from '../ChartsTracks';
import ChartsGenreList from '../ChartsGenreList';
import ChartsTitle from '../ChartsTitle';

class ChartsPage extends Component {
  // ES7 ESLint will complain not sure why
  // static propTypes = {
  //   match: PropTypes.object.isRequired,
  // };

  constructor(props) {
    super(props);
    this.onPageMountOrChange = this.onPageMountOrChange.bind(this);
  }

  /* First load maybe remove it? */
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

  onPageMountOrChange({ match, dispatch }) {
    const genre = match.params.genre;
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
ChartsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

export default connect()(ChartsPage);
