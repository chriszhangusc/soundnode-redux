import styled, { keyframes } from 'styled-components';

const stretchDelay = keyframes`
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1.0);
  }
`;

export default styled.div`
  background-color: ${props => props.theme.colors.themeColor};
  height: 100%;
  width: 7px;
  margin: 0 3px 0 0;
  display: inline-block;
  animation: ${stretchDelay} 1.2s infinite ease-in-out;
  animation-delay: ${props => props.delay}s;
`;
