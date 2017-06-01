import React from 'react';
import { THEME_COLOR } from 'client/app/css/colors';
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

// const MainWrapper = styled.div`
//   padding: 20px 0;
//   margin: 0px auto;
//   width: 100%;
// `;

const SpinnerWrapper = styled.div`
  height: 30px;
  text-align: center;
  font-size: 10px;
`;

const Rect = styled.div`
  background-color: ${props => props.color || THEME_COLOR};
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
