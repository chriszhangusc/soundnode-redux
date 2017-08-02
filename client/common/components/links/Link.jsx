// Basic Link component
import styled from 'styled-components';

const Link = styled.a`
  color: ${props => (props.inverted ? props.theme.fontColorSub : props.theme.fontColor)};
  text-decoration: none;
  transition: color 0.25s ease-out;
  &:hover {
    text-decoration: none;
    color: ${props =>
      props.hoverColor || (props.inverted ? props.theme.fontColorSub : props.theme.fontColor)};
  }

  &:visited,
  &:focus,
  &:active {
    text-decoration: none;
    color: ${props => (props.inverted ? props.theme.fontColorSub : props.theme.fontColor)};
  }
`;

export default Link;
