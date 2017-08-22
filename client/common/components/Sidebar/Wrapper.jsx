import Fixed from 'common/components/Fixed';

export default Fixed.extend`
  width: 300px;
  height: 100%;
  background-color: ${props => props.theme.colors.bgSub};
  z-index: ${props => props.theme.zIndexes[1]};
  transform: translateX(${props => (props.sidebarHidden ? '-300px' : '0')});
  transition: all .5s ease-in-out;
`;

