import styled from 'styled-components';
import { FONT_COLOR_SECONDARY, SEPARATOR_COLOR_DARK } from 'app/css/colors';

const StyledTitle = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: ${FONT_COLOR_SECONDARY};
  border-bottom: 1px solid ${SEPARATOR_COLOR_DARK};
  padding: 10px;
`;

export default StyledTitle;
