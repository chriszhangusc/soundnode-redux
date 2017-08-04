import React from 'react';
import styled, { keyframes } from 'styled-components';

const strechDelay = keyframes`
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1.0);
  }
`;

const SpinnerWrapper = styled.div`
  height: 30px;
  text-align: center;
  font-size: 10px;
`;

const Rect = styled.div`
  background-color: ${props => props.color || props.theme.colors.themeColor};
  height: 100%;
  width: 7px;
  margin: 0 3px 0 0;
  display: inline-block;
  animation: ${strechDelay} 1.2s infinite ease-in-out;
  animation-delay: ${props => props.delay}s;
`;

const delays = [0, -1.1, -1.0, -0.9, -0.8];

function Spinner({ color }) {
  return (
    <SpinnerWrapper>
      {delays.map((delay, idx) => <Rect color={color} delay={delay} key={idx} />)}
    </SpinnerWrapper>
  );
}

export default Spinner;
