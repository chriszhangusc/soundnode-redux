import styled from 'styled-components';
import Fixed from '@soundnode-redux/client/src/common/components/Fixed';

export default styled(Fixed)`
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: ${props => props.theme.colors.bgSub};
  z-index: ${props => props.theme.zIndexes.player};
`;
