// import NavLink from 'common/components/links/NavLink';
import RouterLink from 'common/components/links/RouterLink';

export default RouterLink.extend`
  font-size: 1.05rem;
  display: block;
  color: ${props => props.theme.colors.fontColor};
  background: ${props => props.selected && 'rgba(255, 255, 255, 0.2)'};

  &:hover {
    color: ${props => props.theme.colors.fontColorSub};
  }
`;
