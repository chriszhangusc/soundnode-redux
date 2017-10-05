import Fixed from 'common/components/Fixed';

export default Fixed.extend`
  width: 300px;
  top: 0;
  left: 0;
  height: 100%;
  background-color: ${props => props.theme.colors.bgSub};
  z-index: ${props => props.theme.zIndexes[5]};
  transform: translateX(${props => (props.sidebarHidden ? '-310px' : '0')});
  transition: transform 500ms ease-in;
`;
