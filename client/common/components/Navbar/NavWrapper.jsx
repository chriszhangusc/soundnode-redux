import Fixed from 'common/components/Fixed';

export default Fixed.extend`
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${props => props.theme.zIndexes.headerBar};
  background-color: ${props => props.theme.colors.bgSub};
`;
