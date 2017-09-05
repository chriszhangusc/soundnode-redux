import Fixed from 'common/components/Fixed';

export default Fixed.extend`
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: ${props => props.theme.colors.bgSub};
  z-index: ${props => props.theme.zIndexes[2]};
`;
