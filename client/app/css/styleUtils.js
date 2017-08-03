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

export function truncate(width) {
  return `
    width: ${width};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
}

// Then you can use it like this:
// import { truncate } from '../style-utils';
// // Make this div truncate the text with an ellipsis
// const Box = styled.div`
//   ${ truncate('250px') }
//   background: papayawhip;
// `;
