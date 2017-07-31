import styled from 'styled-components';
import { fontColor, fontColorSub } from 'app/css/colors';

const StyledTitle = styled.h1`
  font-weight: 400;
  margin: 0;
  font-size: 2rem;
  color: ${props => (props.secondary ? fontColorSub : fontColor)};
`;

export default StyledTitle;
