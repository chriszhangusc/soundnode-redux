import RouterLink from '@soundnode-redux/client/src/common/components/links/RouterLink';

export default RouterLink.extend`
  color: ${props => props.theme.colors.fontColorSub};
  font-size: 0.9rem;
  font-weight: 700;
  &:hover {
    color: ${props => props.theme.colors.fontColor};
  }
`;
