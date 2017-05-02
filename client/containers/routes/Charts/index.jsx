import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadChartsPage, changeGenre } from 'client/redux/modules/charts/actions';
import { changeVisiblePlaylistName } from 'client/redux/modules/playlist/actions';
import { GENRES, DEFAULT_GENRE } from 'client/constants/ChartsConsts';
import styled from 'styled-components';

import ChartsSongCardListContainer from './containers/ChartsSongCardListContainer';
import GenreListContainer from './containers/GenreListContainer';
import ChartsTitleContainer from './containers/ChartsTitleContainer';

const ChartsHeaderWrapper = styled.div`
  padding: 20px 0 0 20px;
`;


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

  onPageMountOrChange({ match, history, dispatch }) {
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
        <ChartsHeaderWrapper>
          <ChartsTitleContainer />
          <GenreListContainer />
        </ChartsHeaderWrapper>
        <ChartsSongCardListContainer />
      </div>
    );
  }
}

ChartsPageContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect()(ChartsPageContainer);
