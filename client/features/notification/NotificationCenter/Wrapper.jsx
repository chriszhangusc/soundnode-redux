import Fixed from 'common/components/Fixed';

export default Fixed.extend`
  top: 100px;
  right: 0;
  z-index: ${props => props.theme.zIndexes[4]};
`;
