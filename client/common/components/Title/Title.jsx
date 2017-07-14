import styled from 'styled-components';
import { FONT_COLOR_PRIMARY, FONT_COLOR_SECONDARY } from 'app/css/colors';

const StyledTitle = styled.h1`
  font-weight: 400;
  margin: 10px 0;
  font-size: 2rem;
  color: ${props => (props.secondary ? FONT_COLOR_SECONDARY : FONT_COLOR_PRIMARY)};
`;

export default StyledTitle;
