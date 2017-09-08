import styled from 'styled-components';
import { media } from 'app/css/styleUtils';

export default styled.ul`
  position: absolute;
  ${media.desktopLG`right: 22px;`};
  ${media.desktop4K`right: 35px;`};
  top: -128px;
  display: block;
  background: ${props => props.theme.colors.separatorClean};
  border-radius: 10px;

  & li:last-child {
    border-bottom: none;
  }
`;
