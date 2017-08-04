import RouterLink from 'common/components/links/RouterLink';

const GenreLinkButton = RouterLink.extend`
  display: inline-block;
  width: 19%;
  letter-spacing: 1px;
  border: 1px solid;
  border-radius: 3px;
  margin: 5px;
  text-align: center;
  margin: 5px 5px 0 0;
  padding: .4em .75em;
  font-size: 0.75rem;
  transition: color 200ms ease-in;
  &:hover {
    color: ${props => props.theme.colors.fontColorSub};
  }
`;

export default GenreLinkButton;
