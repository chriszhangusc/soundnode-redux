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

  &.overlay-enter {
    opacity: 0.01;
  }

  &.overlay-enter.overlay-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }

  &.overlay-leave {
    opacity: 1;
  }

  &.overlay-leave.overlay-leave-active {
    opacity: 0.01;
    transition: opacity 500ms ease-in;
  }

  &.overlay-appear {
    opacity: 0.01;
  }

  &.overlay-appear.overlay-appear-active {
    opacity: 1;
    transition: opacity 0.5s ease-in;
  }
`;
