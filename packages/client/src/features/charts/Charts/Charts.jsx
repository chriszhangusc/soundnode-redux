import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Query } from 'react-apollo';
import InfiniteScroll from '@soundnode-redux/client/src/common/components/InfiniteScroll';
import withScrollToTopOnEnter from '@soundnode-redux/client/src/common/hocs/withScrollToTopOnEnter';
import { connect } from 'react-redux';
import {
  loadChartsPage,
  updateGenre,
  resetChartsState,
} from '@soundnode-redux/client/src/features/charts/chartsActions';
import PageTitle from '@soundnode-redux/client/src/common/components/PageTitle';
import { getCurrentGenreTitle } from '@soundnode-redux/client/src/features/charts/chartsSelectors';
import { mergeObjects } from '@soundnode-redux/client/src/common/utils/generalUtils';
import ChartsTracks from '../ChartsTracks';
import ChartsGenreList from '../ChartsGenreList';
import { FETCH_CHARTS } from '../graphql/query';

const LIMIT = 20;

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

  onPageMountOrChange = ({
    match: {
      params: { genre },
    },
  }) => {
    this.props.updateGenre(genre);
    this.props.loadChartsPage(genre);
  };

  render() {
    const {
      genreTitle,
      match: {
        params: { genre },
      },
    } = this.props;

    const variables = {
      genre,
      offset: 0,
      limit: LIMIT,
    };

    return (
      <Query query={FETCH_CHARTS} variables={variables} notifyOnNetworkStatusChange>
        {({ loading, data, fetchMore }) =>
          console.log({ data }) || (
            <React.Fragment>
              <PageTitle>Top Charts - {genreTitle}</PageTitle>
              <ChartsGenreList />
              <InfiniteScroll
                onBottomReached={() => {
                  const hasNext = _.get(data, 'charts.pageInfo.hasNext');

                  if (!loading && hasNext) {
                    fetchMore({
                      variables: { offset: data.charts.pageInfo.offsetNext },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev;

                        return Object.assign({}, prev, {
                          charts: {
                            ...fetchMoreResult.charts,
                            // NOTE: The results returned by soundcloud api
                            // sometimes contains duplicates
                            nodes: mergeObjects(
                              prev.charts.nodes,
                              fetchMoreResult.charts.nodes,
                              obj => obj.id,
                            ),
                          },
                        });
                      },
                    });
                  }
                }}
              >
                <ChartsTracks
                  selectedGenre={genre}
                  name={`charts-${genre}`}
                  playlistTitle={`Charts - ${genreTitle}`}
                />
              </InfiniteScroll>
            </React.Fragment>
          )
        }
      </Query>
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
  };
}

const actions = {
  loadChartsPage,
  updateGenre,
  resetChartsState,
};

export default compose(
  connect(
    mapStateToProps,
    actions,
  ),
  withScrollToTopOnEnter,
)(Charts);
