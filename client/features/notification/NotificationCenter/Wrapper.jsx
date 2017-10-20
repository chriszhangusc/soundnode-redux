import Fixed from 'common/components/Fixed';

export default Fixed.extend`
  top: 100px;
  right: 12px;
  z-index: ${props => props.theme.zIndexes[4]};
`;
