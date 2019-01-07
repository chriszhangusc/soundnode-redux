import Fixed from '@soundnode-redux/client/src/common/components/Fixed';

export default Fixed.extend`
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: ${props => props.theme.colors.bgSub};
  z-index: ${props => props.theme.zIndexes.player};
`;
