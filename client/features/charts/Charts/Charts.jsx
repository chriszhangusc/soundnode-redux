import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadChartsPage, updateGenre, resetChartsState } from 'features/charts/chartsActions';
import PageTitle from 'common/components/PageTitle';
import { getCurrentGenreTitle, getSelectedGenre } from 'features/charts/chartsSelectors';
import ChartsTracks from '../ChartsTracks';
import ChartsGenreList from '../ChartsGenreList';

class Charts extends Component {
  static propTypes = {
    genreTitle: PropTypes.string,
    loadChartsPage: PropTypes.func.isRequired,
    updateGenre: PropTypes.func.isRequired,
    resetChartsState: PropTypes.func.isRequired,
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
    this.props.updateGenre(genre);
    this.props.loadChartsPage(genre);
  };

  render() {
    const { genreTitle, selectedGenre } = this.props;
    return (
      <div>
        <PageTitle>Top Charts - {genreTitle}</PageTitle>
        <ChartsGenreList />
        <ChartsTracks
          selectedGenre={selectedGenre}
          name={`charts-${selectedGenre}`}
          playlistTitle={`Charts - ${genreTitle}`}
        />
      </div>
    );
  }
}

// Charts.defaultProps = {
//   genreTitle: '',
// };

// Charts.propTypes = {
//   genreTitle: PropTypes.string,
//   loadChartsPage: PropTypes.func.isRequired,
//   updateGenre: PropTypes.func.isRequired,
//   resetChartsState: PropTypes.func.isRequired,
//   updateVisiblePlayQueueName: PropTypes.func.isRequired,
//   match: PropTypes.shape({
//     params: PropTypes.object,
//   }).isRequired,
// };

function mapStateToProps(state) {
  return {
    genreTitle: getCurrentGenreTitle(state),
    selectedGenre: getSelectedGenre(state),
  };
}

const actions = {
  loadChartsPage,
  updateGenre,
  resetChartsState,
};

export default connect(mapStateToProps, actions)(Charts);
