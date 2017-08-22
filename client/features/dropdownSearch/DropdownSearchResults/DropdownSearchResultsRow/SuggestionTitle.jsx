import styled from 'styled-components';
import { truncateWidth } from 'app/css/styleUtils';

export default styled.span`
  font-size: 0.95rem;
  max-width: 100%;
  ${truncateWidth('100%')};
`;
