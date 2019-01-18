import styled from 'styled-components';
import Fixed from '@soundnode-redux/client/src/common/components/Fixed';

export default styled(Fixed)`
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${props => props.theme.zIndexes.headerBar};
  background-color: ${props => props.theme.colors.bgSub};
`;
