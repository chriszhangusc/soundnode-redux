import React from 'react';
import PropTypes from 'prop-types';
import LinkButton from 'client/common/components/Buttons/LinkButton';
import { CHARTS_SUBTITLE } from 'client/features/charts/chartsConsts';
import styled from 'styled-components';
import GenreListTitle from './GenreListTitle';

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
function renderGenreList(genreListData) {
  return genreListData.map(genre => (
    <LinkButton key={genre.link} to={`/charts/${genre.link}`}>{genre.title}</LinkButton>
  ));
}

export default function GenreList({ genreListData }) {
  return (
    <GenreListWrapper>
      <GenreListTitle>{CHARTS_SUBTITLE}</GenreListTitle>
      { renderGenreList(genreListData) }
    </GenreListWrapper>
  );
}

GenreList.propTypes = {
  genreListData: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
};

