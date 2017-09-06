import styled from 'styled-components';
import { truncateWidth } from 'app/css/styleUtils';

export default styled.span`
  flex-grow: 1;
  width: 200px;
  ${truncateWidth('200px')};
  text-align: left;
  margin-right: 10px;
  color: ${props => props.theme.colors.fontColor};
  font-size: 1rem;
  & span {
    margin: 10px;
  }
`;
