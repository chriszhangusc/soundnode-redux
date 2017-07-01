import NavLink from 'common/components/links/NavLink';
import { FONT_COLOR_PRIMARY, GRAY } from 'app/css/colors';

const SidebarNavLink = NavLink.extend.attrs({
  // Passing activeClassName as default
  activeClassName: 'sidebarLinkActive',
})`
  font-size: 1.1rem;
  display: block;
  text-align: center;
  color: ${FONT_COLOR_PRIMARY};
  transition: color 0.25s ease-out;

  &:hover, &:active {
    color: ${GRAY};
  }

  &.${props => props.activeClassName} {
    background: rgba(255,255,255,0.2);
  }
`;

export default SidebarNavLink;
