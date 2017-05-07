import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadChartsPage, changeGenre } from 'client/redux/modules/charts/chartsActions';
import { changeVisiblePlaylistName } from 'client/redux/modules/playlist/actions';
import { DEFAULT_GENRE } from 'client/redux/modules/charts/chartsConsts';
import { getGenreList } from 'client/redux/modules/charts/chartsSelectors';
import { CHARTS_ROUTE } from 'client/constants/RouteConsts';
import ChartsSongCardListContainer from './containers/ChartsSongCardListContainer';
import GenreListContainer from './containers/GenreListContainer';
import ChartsTitleContainer from './containers/ChartsTitleContainer';



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

  /* Change to different routes */
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.genre !== this.props.match.params.genre) {
      this.onPageMountOrChange(nextProps);
    }
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
      <div className="container-fluid">
        <ChartsTitleContainer />
        <GenreListContainer />
        <ChartsSongCardListContainer />
      </div>
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
