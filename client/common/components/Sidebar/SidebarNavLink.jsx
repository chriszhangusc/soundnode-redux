import NavLink from 'common/components/links/NavLink';

const SidebarNavLink = NavLink.extend`
  font-size: 1.05rem;
  display: block;
  color: ${props => props.theme.colors.fontColor};

  &:hover {
    color: ${props => props.theme.colors.fontColorSub};
  }

  background: ${props => props.active && 'rgba(255, 255, 255, 0.2)'};
`;

export default SidebarNavLink;
