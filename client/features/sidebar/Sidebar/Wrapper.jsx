import Fixed from 'common/components/Fixed';

export default Fixed.extend`
  width: 300px;
  top: 0;
  left: 0;
  height: 100%;
  background-color: ${props => props.theme.colors.bgSub};
  z-index: ${props => props.theme.zIndexes[5]};
  transform: translateX(${props => (props.sidebarHidden ? '-300px' : '0')});
  transition: all 0.5s ease-in-out;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
`;
