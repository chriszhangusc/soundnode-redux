import RouterLink from 'common/components/links/RouterLink';

const CommentUsername = RouterLink.extend`
  color: ${props => props.theme.fontColorSub};
  font-size: 0.85rem;
  font-weight: 700;
`;

export default CommentUsername;
