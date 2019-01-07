// Basic Link component
import styled from 'styled-components';

// The order matters
// a {color:#FF0000;}      /* unvisited link */
// a:visited {color:#00FF00;}  /* visited link */
// a:hover {color:#FF00FF;}  /* mouse over link */
// a:active {color:#0000FF;}  /* selected link */

// https://medium.com/styled-components/announcing-v2-f01ef3766ac2
// The .extend and .withComponent helpers
// Sometimes, a single styled-component with lots of props isn’t the best way to do things
// it can be better to build up a family of related components.

const Link = styled.a`
  cursor: pointer;
  color: ${props => props.theme.colors.fontColor};
  text-decoration: none;
  transition: color 200ms ease-out;
  /*
  &:visited {
    color: ${props => (props.inverted ? props.theme.colors.fontColorSub : props.theme.colors.fontColor)};
  }*/
  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
    color: ${props => props.theme.colors.fontColor};
  }
`;

export default Link;
