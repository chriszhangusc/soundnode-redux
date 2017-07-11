import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadChartsPage, changeGenre, resetChartsState } from 'features/charts/chartsActions';
import { updateVisiblePlaylistName } from 'features/playlist/playlistActions';
import { Grid } from 'react-bootstrap';
import Title from 'common/components/Title';
import { getCurrentGenreTitle } from 'features/charts/chartsSelectors';

import ChartsTracks from '../ChartsTracks';
import ChartsGenreList from '../ChartsGenreList';

class ChartsView extends Component {
  constructor(props) {
    super(props);
    this.onPageMountOrChange = this.onPageMountOrChange.bind(this);
  }

  componentDidMount() {
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
    const { genreTitle } = this.props;
    return (
      <Grid fluid>
        <Title>Top Charts - {genreTitle}</Title>
        <ChartsGenreList />
        <ChartsTracks />
      </Grid>
    );
  }
}

ChartsView.defaultProps = {
  genreTitle: '',
};

ChartsView.propTypes = {
  genreTitle: PropTypes.string,
  loadChartsPage: PropTypes.func.isRequired,
  changeGenre: PropTypes.func.isRequired,
  resetChartsState: PropTypes.func.isRequired,
  updateVisiblePlaylistName: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    genreTitle: getCurrentGenreTitle(state),
  };
}

const actions = {
  loadChartsPage,
  changeGenre,
  resetChartsState,
  updateVisiblePlaylistName,
};

export default connect(mapStateToProps, actions)(ChartsView);
