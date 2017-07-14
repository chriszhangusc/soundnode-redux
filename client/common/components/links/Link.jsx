// Basic Link component
import styled from 'styled-components';

const Link = styled.a`
  color: ${props => props.theme.fontColor};
  text-decoration: none;
  &:hover,
  &:focus,
  &:active {
    color: ${props => props.theme.fontColor};
    cursor: pointer;
    text-decoration: none;
  }
`;

export default Link;
