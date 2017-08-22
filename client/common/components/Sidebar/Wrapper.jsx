import Fixed from 'common/components/Fixed';

export default Fixed.extend`
  width: 300px;
  height: 100%;
  background-color: ${props => props.theme.colors.bgSub};
  z-index: ${props => props.theme.zIndexes[1]};
`;
