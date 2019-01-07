import React from 'react';
import { genreListData } from '@soundnode-redux/client/src/features/charts/chartsConsts';
import Wrapper from './Wrapper';
import GenreListTitle from './GenreListTitle';
import GenreLinkButton from './GenreLinkButton';
import GenreListWrapper from './GenreListWrapper';

export default function ChartsGenreList() {
  const genreList = genreListData.map(genre => (
    <GenreLinkButton key={genre.link} to={`/charts/${genre.link}`}>
      {genre.title}
    </GenreLinkButton>
  ));

  return (
    <Wrapper>
      <GenreListTitle>Charts By Genre</GenreListTitle>
      <GenreListWrapper>{genreList}</GenreListWrapper>
    </Wrapper>
  );
}
