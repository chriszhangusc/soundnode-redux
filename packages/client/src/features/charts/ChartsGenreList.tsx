import React from 'react';
import styled from 'styled-components';
import { GENRE_LIST } from '@soundnode-redux/client/src/features/charts/consts';
import RouterLink from '@soundnode-redux/client/src/common/components/links/RouterLink';

const GenreLinkButton = styled(RouterLink)`
  display: inline-block;
  width: 19%;
  letter-spacing: 1px;
  border: 1px solid;
  border-radius: 3px;
  margin: 5px;
  text-align: center;
  margin: 5px 5px 0 0;
  padding: 0.4em 0.75em;
  font-size: 0.75rem;
  transition: color 200ms ease-in;
  &:hover {
    color: ${(props) => props.theme.colors.fontColorSub};
  }
`;

const GenreListTitle = styled.h3`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.fontColorSub};
`;

const GenreListWrapper = styled.div`
  height: 95px;
  transition: height 400ms;
  &:hover {
    height: 190px;
  }
`;

const Wrapper = styled.div`
  overflow: hidden;
  margin-bottom: 20px;
  padding: 0 15px;
`;

function ChartsGenreList() {
  const genreList = GENRE_LIST.map((genre) => (
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

export default ChartsGenreList;
