import styled from 'styled-components';
import Fixed from '@soundnode-redux/client/src/common/components/Fixed';

export default styled(Fixed)`
  top: 100px;
  right: 12px;
  z-index: ${props => props.theme.zIndexes.notification};
`;
