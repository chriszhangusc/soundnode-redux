// import NavLink from 'common/components/links/NavLink';
// import RouterLink from 'common/components/links/RouterLink';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const activeClassName = 'nav-item-active';

export default styled(NavLink).attrs({
  activeClassName,
})`
  font-size: 1.05rem;
  line-height: 80px;
  display: block;
  text-align: left;
  cursor: pointer;
  color: ${props => props.theme.colors.fontColor};
  text-decoration: none;
  transition: background-color 200ms ease-out;

  &.${activeClassName} {
    color: ${props => props.theme.colors.fontColor};
    background-color: rgba(255, 255, 255, 0.3);
    text-decoration: none;
  }

  &:hover {
    color: ${props => props.theme.colors.fontColor};
    background-color: rgba(255, 255, 255, 0.2);
    text-decoration: none;
  }

`;
