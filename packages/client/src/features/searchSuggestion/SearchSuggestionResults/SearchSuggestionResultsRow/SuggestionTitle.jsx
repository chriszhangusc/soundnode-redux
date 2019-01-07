import styled from 'styled-components';
import { truncateWidth } from '@soundnode-redux/client/src/app/css/styleUtils';

export default styled.span`
  font-size: 0.95rem;
  max-width: 100%;
  ${truncateWidth('100%')};
`;
