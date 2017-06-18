import { injectGlobal } from 'styled-components';
import { FONT_COLOR_PRIMARY, BACKGROUND_COLOR, LIGHTER_GRAY } from 'client/app/css/colors';

// Global CSS
injectGlobal`

  * {
    padding: 0;
    margin: 0;
  }

  html {
    font-family: 'Open Sans';
    /* Always put font-size here so that we could apply rem */
    font-size: 14px;
  }

  body {
    color: ${FONT_COLOR_PRIMARY};
    background-color: ${BACKGROUND_COLOR};
  }

  a {
    color: ${LIGHTER_GRAY};
    text-decoration: none;
    &:hover,
    &:focus,
    &:active {
      color: ${LIGHTER_GRAY};
      cursor: pointer;
      text-decoration: none;
    }
  }

  .container {
    padding: 0;
  }

  .content {
    margin: 40px 0 80px;
  }

  ul {
    list-style-type: none;
  }

  .pad-bottom {
    padding-bottom: 70px;
  }

  .container-fluid {
    padding: 0;
  }
`;
