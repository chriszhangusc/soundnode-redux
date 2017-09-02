import styled from 'styled-components';

export default styled.p`
  font-size: 1rem;
  overflow: scroll;
  height: 240px;
  width: 500px;
  color: ${props => props.theme.colors.fontColorSub};
  white-space: pre-wrap;
`;
