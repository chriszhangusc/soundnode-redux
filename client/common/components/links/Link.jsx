// Basic Link component
import styled from 'styled-components';

// The order matters
// a {color:#FF0000;}      /* unvisited link */
// a:visited {color:#00FF00;}  /* visited link */
// a:hover {color:#FF00FF;}  /* mouse over link */
// a:active {color:#0000FF;}  /* selected link */

const Link = styled.a`
  cursor: pointer;
  color: ${props => (props.inverted ? props.theme.fontColorSub : props.theme.fontColor)};
  text-decoration: none;
  transition: color 200ms ease-out;

  /*
  &:visited {
    color: ${props => (props.inverted ? props.theme.fontColorSub : props.theme.fontColor)};
  }*/
  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
    color: ${props => (props.inverted ? props.theme.fontColor : props.theme.fontColorSub)};
  }
`;

export default Link;
