import { css } from 'styled-components';

export const media = {
  tablet: (...args) => css`
    @media (min-width: 768px) and (max-width: 1023px) {
      ${css(...args)}
    }
  `,

  desktop: (...args) => css`
    @media (min-width: 1024px) and (max-width: 1439px) {
      ${css(...args)}
    }
  `,

  desktopLG: (...args) => css`
    @media (min-width: 1440px) and (max-width: 2559px) {
      ${css(...args)}
    }
  `,

  desktop4K: (...args) => css`
    @media (min-width: 2560px) {
      ${css(...args)}
    }
  `,
};

const truncate = `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;`;

export function truncateWidth(width) {
  return `
    width: ${width || '100%'};
    ${truncate};
  `;
}

export function truncateMaxWidth(maxWidth) {
  return `
    maxWidth: ${maxWidth || '100%'};
    ${truncate};
  `;
}