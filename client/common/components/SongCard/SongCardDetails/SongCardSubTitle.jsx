import RouterLink from 'common/components/links/RouterLink';

export default RouterLink.extend`
  margin-left: 10px;
  color: ${props => props.theme.fontColorSub};
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 32px; /* Vertical align!! It should be equal to the height of avatar */
  max-height: 32px;
  max-width: 160px;
  font-size: 0.9rem;
  &:hover {
    color: ${props => props.theme.fontColor};
  }
`;
