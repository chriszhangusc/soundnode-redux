import { GENRE_LIST } from './consts';

// invalid genre like this: http://localhost:3000/top50/All-Music/adfasdfasdfasdf
export function validateGenre(genre) {
  return GENRE_LIST.filter(item => item.link === genre).length > 0;
}

export function getGenreTitle(genreCompact) {
  const result = GENRE_LIST.filter(itme => itme.link === genreCompact);

  if (result.length > 0) {
    return result[0].title;
  }

  return '';
}
