import NavLink from 'common/components/links/NavLink';

const SidebarNavLink = NavLink.extend.attrs({
  // Passing activeClassName as default
  activeClassName: 'sidebarLinkActive',
})`
  font-size: 1.05rem;
  display: block;
  color: ${props => props.theme.colors.fontColor};
  
  &:hover {
    color: ${props => props.theme.colors.fontColorSub};
  }

  &.${props => props.activeClassName} {
    background: rgba(255,255,255,0.2);
  }
`;

export default SidebarNavLink;
