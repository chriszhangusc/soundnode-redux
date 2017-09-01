import styled from 'styled-components';

export default styled.div`
  position: absolute;
  top: -16px;
  right: -16px;
  margin: 10px;
  width: 14px;
  height: 14px;
  z-index: 3;
  background-color: ${props => props.theme.colors.themeColor};
  border-radius: 50%;
  border: 2px solid ${props => props.theme.colors.themeColor};
  cursor: pointer;
`;
