import styled from 'styled-components';
import { FONT_COLOR_PRIMARY, FONT_COLOR_SECONDARY } from 'app/css/colors';

const StyledTitle = styled.h1`
  font-weight: 400;
  font-size: 2rem;
  margin: ${props => (props.resetMargins ? '0' : '10px 0')};
  color: ${props => (props.dark ? FONT_COLOR_SECONDARY : FONT_COLOR_PRIMARY)};
`;

export default StyledTitle;
