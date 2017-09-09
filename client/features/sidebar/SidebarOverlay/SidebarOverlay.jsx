import styled from 'styled-components';

export default styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 1s ease-in-out;
  z-index: ${props => (props.sidebarHidden ? props.theme.zIndexes[0] : props.theme.zIndexes[4])};
  opacity: ${props => (props.sidebarHidden ? 0 : 1)};
  background: rgba(0, 0, 0, 0.5);
`;
