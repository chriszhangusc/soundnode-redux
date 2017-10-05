import Link from './Link';

const LinkButton = Link.extend`
  display: inline-block;
  border: 1px solid;
  border-radius: 0.25em;
  padding: 3px 6px;
  color: ${props => props.theme.colors.fontColorSub};
  font-size: 0.75rem;
  margin-right: 10px;

  & i {
    margin-right: 5px;
  }

  &:hover {
    color: ${props => props.theme.colors.fontColor};
  }

  &:active,
  &:focus {
    color: ${props => props.theme.colors.fontColorSub};
  }
`;

export default LinkButton;
