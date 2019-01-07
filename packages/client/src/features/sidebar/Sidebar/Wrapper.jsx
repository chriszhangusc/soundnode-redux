import Fixed from '@soundnode-redux/client/src/common/components/Fixed';

export default Fixed.extend`
  width: 300px;
  top: 0;
  left: 0;
  height: 100%;
  background-color: ${props => props.theme.colors.bgSub};
  z-index: ${props => props.theme.zIndexes.sidebar};
  transform: translateX(
    ${props => (props.sidebarHidden ? '-310px' : '0')}
  ); /* 10px more to hide shadow */
  transition: transform 400ms ease-in-out;
`;
