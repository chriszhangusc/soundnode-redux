import styled from 'styled-components';

export default styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: ${props => props.theme.colors.themeColor};
  cursor: pointer;
`;
