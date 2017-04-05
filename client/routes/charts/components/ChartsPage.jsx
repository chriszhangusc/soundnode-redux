import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { GENRES, DEFAULT_GENRE } from 'client/constants/ChartsConsts';
import { loadChartsPage, changeGenre } from 'client/redux/modules/charts';
import ChartsSongCardListContainer from '../containers/ChartsSongCardListContainer';
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

  /* Prepare data for the view */
  componentWillMount() {
    this.onPageMountOrChange(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.genre !== this.props.match.params.genre) {
      this.onPageMountOrChange(nextProps);
    }
  }

  /* Execute whenever this page initially loaded or needs update */
  onPageMountOrChange(props) {
    const { match, history, dispatch } = props;
    const genreFromUrl = match.params.genre;
    const valid = GENRES.filter(item => item.link === genreFromUrl).length > 0;

    // Handle routes that are partially matched but containing
    // invalid genre like this: http://localhost:3000/top50/All-Music/adfasdfasdfasdf
    const genre = valid ? genreFromUrl : DEFAULT_GENRE;
    if (!valid) history.push(`/charts/${DEFAULT_GENRE}`);
    dispatch(changeGenre(genre));
    dispatch(loadChartsPage(genre));
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <GenreCharts />
          <ChartsSongCardListContainer />
        </div>
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



// // Move these hooks into seperate files
//   const onChartsPageEnter = (nextState, replace) => {
//     const { dispatch } = store;
//     const genreFromUrl = nextState.params.genre;
//     const valid = GENRES.filter(item => item.link.indexOf(genreFromUrl) > -1).length > 0;

//     // Handle routes that are partially matched but containing
//     // invalid genre like this: http://localhost:3000/top50/All-Music/adfasdfasdfasdf
//     const genre = valid ? genreFromUrl : DEFAULT_GENRE;
//     if (!valid) replace(`/charts/${DEFAULT_GENRE}`);
//     dispatch(loadCharts(genre));
//   };

//   const onChartsPageLeave = () => {
//     console.log('onChartsPageLeave');
//     const { dispatch } = store;
//     dispatch(clearVisibleTracks());
//   };