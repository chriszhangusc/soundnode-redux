import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

const spinnerDash = keyframes`
0% {
stroke-dasharray: 1,200;
stroke-dashoffset: 0;
}
50% {
stroke-dasharray: 89,200;
stroke-dashoffset: -35px;
}
100% {
stroke-dasharray: 89,200;
stroke-dashoffset: -124px;
}
`;

const Svg = styled.svg`
  animation: ${rotate360} 2s linear infinite;
  transform-origin: center center;
`;

const Circle = styled.circle`
  animation: ${spinnerDash} 1.5s ease-in-out infinite;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  stroke: ${props => props.theme.colors.fontColor};
`;

const Wrapper = styled.div`
  margin: 0px auto 10px auto;
  width: 50px;
  max-height: 100%;
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`;

function Spinner() {
  return (
    <Wrapper>
      <Svg viewBox="25 25 50 50">
        <Circle cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
      </Svg>
    </Wrapper>
  );
}

export default Spinner;
