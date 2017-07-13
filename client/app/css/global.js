import { injectGlobal } from 'styled-components';
import { FONT_COLOR_PRIMARY, BACKGROUND_COLOR } from 'app/css/colors';

// Global CSS
injectGlobal([`
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
`]);
