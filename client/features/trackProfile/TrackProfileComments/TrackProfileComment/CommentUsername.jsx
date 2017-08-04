import RouterLink from 'common/components/links/RouterLink';

const CommentUsername = RouterLink.extend`
  color: ${props => props.theme.colors.fontColorSub};
  font-size: 0.85rem;
  font-weight: 700;
  &:hover {
    color: ${props => props.theme.colors.fontColor};
  }
`;

export default CommentUsername;
