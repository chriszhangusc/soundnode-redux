import { genreListData } from './chartsConsts';

// invalid genre like this: http://localhost:3000/top50/All-Music/adfasdfasdfasdf
export function validateGenre(genre) {
  return genreListData.filter(item => item.link === genre).length > 0;
}

export function getGenreTitle(genreCompact) {
  const result = genreListData.filter(itme => itme.link === genreCompact);

  if (result.length > 0) {
    return result[0].title;
  }

  return '';
}
