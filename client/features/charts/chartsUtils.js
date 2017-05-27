import { genreListData } from './chartsConsts';

export function validateGenre(genre) {
  return genreListData.filter(item => item.link === genre).length > 0;
}
