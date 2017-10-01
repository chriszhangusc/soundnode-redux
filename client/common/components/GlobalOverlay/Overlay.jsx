import styled from 'styled-components';

export default styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.5);
  color: ${props => props.color};
  transition: opacity 500ms ease-out;
  display: flex;
  text-align: center;
  font-size: 1.2em;
  z-index: ${props => props.theme.zIndexes[4]};
`;
