import React from 'react';
import { genreListData } from 'features/charts/chartsConsts';
import styled from 'styled-components';
import GenreListTitle from './GenreListTitle';
import GenreLinkButton from './GenreLinkButton';

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  height: 105px;
  transition: height 0.4s;
  margin-bottom: 20px;
  padding: 0 15px;
  &:hover {
    height: 250px;
  }
`;

/* Since we only connect to store for playlist name, so no need to wrap it in a container */
/* chartsGenre is fetched from redux store directly */
function renderGenreList() {
  return genreListData.map(genre =>
    <GenreLinkButton key={genre.link} to={`/charts/${genre.link}`}>
      {genre.title}
    </GenreLinkButton>,
  );
}

export default function ChartsGenreList() {
  return (
    <Wrapper>
      <GenreListTitle>Charts By Genre</GenreListTitle>
      {renderGenreList(genreListData)}
    </Wrapper>
  );
}
