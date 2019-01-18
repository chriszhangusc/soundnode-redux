import { createGlobalStyle } from 'styled-components';
import { fontColor, bg } from '@soundnode-redux/client/src/app/css/colors';

// Global CSS Component
const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
  }

  html {
    font-family: 'Open Sans';
    /* Always requestPut font-size here so that we could apply rem */
    font-size: 14px;
  }

  body {
    color: ${fontColor};
    background-color: ${bg};
  }

  .container {
    padding: 0;
  }

  .content {
    margin: 40px 0 80px;
  }

  ul {
    list-style-type: none;
    margin: 0;
  }

  .container-fluid {
    padding: 0;
  }
`;

export default GlobalStyles;
