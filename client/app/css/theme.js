import * as colors from './colors';

// Too implicit
export const fontSizes = ['0.8rem', '0.9rem', '0.95rem', '1rem', '1.25rem', '1.5rem', '2rem'];

// 0 is default
export const zIndexes = [0, 1, 2, 3, 4, 5];

export const darken = n => `rgba(0, 0, 0, ${n})`;

const shades = [
  darken(0),
  darken(1 / 8),
  darken(1 / 4),
  darken(3 / 8),
  darken(1 / 2),
  darken(5 / 8),
  darken(3 / 4),
  darken(7 / 8),
  darken(1),
  darken(2),
];

const theme = {
  colors,
  fontSizes,
  zIndexes,
  shades,
};

export default theme;
