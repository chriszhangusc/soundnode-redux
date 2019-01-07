import RouterLink from '@soundnode-redux/client/src/common/components/links/RouterLink';

export default RouterLink.extend`
  display: block;
  line-height: 35px;
  text-align: center;
  color: ${props => props.theme.colors.fontColorSub};
  font-size: 0.9rem;
  padding: 5px;
`;
