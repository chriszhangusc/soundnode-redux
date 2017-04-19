import React from 'react';
import PropTypes from 'prop-types';
import LinkButton from 'client/components/Buttons/LinkButton';
import { GENRES, CHARTS_MAIN_TITLE_PREFIX, CHARTS_SUBTITLE } from 'client/constants/ChartsConsts';
import styled from 'styled-components';
import ChartsSubtitle from './ChartsSubtitle';

const GenreListWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  height: 105px;
  transition: height 0.4s;
  margin: 0 0 20px 0;

  &:hover{
    height: 250px;
  }
`;
/* Since we only connect to store for playlist name, so no need to wrap it in a container */
/* chartsGenre is fetched from redux store directly */
function renderGenreList() {
  return GENRES.map(genre => (
    <LinkButton key={genre.link} to={`/charts/${genre.link}`}>{genre.title}</LinkButton>
  ));
}

export default function GenreList() {
  return (
    <GenreListWrapper>
      <ChartsSubtitle text={CHARTS_SUBTITLE} />
      {renderGenreList()}
    </GenreListWrapper>
  );
}

GenreList.propTypes = {

};

