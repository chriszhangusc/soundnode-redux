// Basic Link component
import styled from 'styled-components';
import { LIGHTER_GRAY } from 'app/css/colors';

const Link = styled.a`
    color: ${LIGHTER_GRAY};
    text-decoration: none;
    &:hover,
    &:focus,
    &:active {
      color: ${LIGHTER_GRAY};
      cursor: pointer;
      text-decoration: none;
    }
`;

export default Link;
