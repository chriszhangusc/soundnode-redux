import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  loadChartsPage,
  changeGenre,
  resetChartsState,
} from 'features/charts/chartsActions';
import { updateVisiblePlaylistName } from 'features/playlist/playlistActions';
import { Grid } from 'react-bootstrap';
import ChartsTracks from '../ChartsTracks';
import ChartsGenreList from '../ChartsGenreList';
import ChartsTitle from '../ChartsTitle';

class ChartsPage extends Component {
  constructor(props) {
    super(props);
    this.onPageMountOrChange = this.onPageMountOrChange.bind(this);
  }

  componentWillMount() {
    this.onPageMountOrChange(this.props);
  }

  /* Change to different genre routes */
  componentWillReceiveProps(nextProps) {
    const curGenre = this.props.match.params.genre;
    const nextGenre = nextProps.match.params.genre;
    if (curGenre !== nextGenre && curGenre) {
      this.onPageMountOrChange(nextProps);
    }
  }

  componentWillUnmount() {
    this.props.resetChartsState();
  }

  onPageMountOrChange({ match }) {
    const genre = match.params.genre;
    this.props.updateVisiblePlaylistName(genre);
    this.props.changeGenre(genre);
    this.props.loadChartsPage(genre);
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

ChartsPage.propTypes = {
  loadChartsPage: PropTypes.func.isRequired,
  changeGenre: PropTypes.func.isRequired,
  resetChartsState: PropTypes.func.isRequired,
  updateVisiblePlaylistName: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

const actions = {
  loadChartsPage,
  changeGenre,
  resetChartsState,
  updateVisiblePlaylistName,
};

export default connect(null, actions)(ChartsPage);
