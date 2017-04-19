import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GENRES, CHARTS_MAIN_TITLE_PREFIX, CHARTS_SUBTITLE } from 'client/constants/ChartsConsts';
import { getChartsGenre } from 'client/redux/modules/charts/selectors';
import styled from 'styled-components';
import ChartsTitle from '../components/ChartsTitle';
import GenreList from '../components/GenreList';

const ChartsHeaderWrapper = styled.div`
  padding: 20px 0 0 20px;
`;

function ChartsHeader({ chartsGenre }) {
  return (
    <ChartsHeaderWrapper>
      <ChartsTitle
        text={`${CHARTS_MAIN_TITLE_PREFIX}${GENRES.find(g => g.link === chartsGenre).title}`}
      />
      <GenreList />
    </ChartsHeaderWrapper>
  );
}

ChartsHeader.propTypes = {
  chartsGenre: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  chartsGenre: getChartsGenre(state),
});

export default connect(mapStateToProps)(ChartsHeader);
