import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadChartsPage, changeGenre, resetChartsState } from 'features/charts/chartsActions';
import { updateVisiblePlayQueueName } from 'features/playQueue/playQueueActions';
import PageTitle from 'common/components/PageTitle';
import { getCurrentGenreTitle } from 'features/charts/chartsSelectors';
import { Box } from 'grid-styled';

import ChartsTracks from '../ChartsTracks';
import ChartsGenreList from '../ChartsGenreList';

class Charts extends Component {
  static propTypes = {
    genreTitle: PropTypes.string,
    loadChartsPage: PropTypes.func.isRequired,
    changeGenre: PropTypes.func.isRequired,
    resetChartsState: PropTypes.func.isRequired,
    updateVisiblePlayQueueName: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object,
    }).isRequired,
  };

  static defaultProps = {
    genreTitle: '',
  };

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

  onPageMountOrChange = ({ match }) => {
    const genre = match.params.genre;
    this.props.updateVisiblePlayQueueName(genre);
    this.props.changeGenre(genre);
    this.props.loadChartsPage(genre);
  };

  render() {
    const { genreTitle } = this.props;
    return (
      <Box>
        <PageTitle>
          Top Charts - {genreTitle}
        </PageTitle>
        <ChartsGenreList />
        <ChartsTracks />
      </Box>
    );
  }
}

// Charts.defaultProps = {
//   genreTitle: '',
// };

// Charts.propTypes = {
//   genreTitle: PropTypes.string,
//   loadChartsPage: PropTypes.func.isRequired,
//   changeGenre: PropTypes.func.isRequired,
//   resetChartsState: PropTypes.func.isRequired,
//   updateVisiblePlayQueueName: PropTypes.func.isRequired,
//   match: PropTypes.shape({
//     params: PropTypes.object,
//   }).isRequired,
// };

function mapStateToProps(state) {
  return {
    genreTitle: getCurrentGenreTitle(state),
  };
}

const actions = {
  loadChartsPage,
  changeGenre,
  resetChartsState,
  updateVisiblePlayQueueName,
};

export default connect(mapStateToProps, actions)(Charts);
