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

const Spinner = styled.div`
  &:before {
    content: '';
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: white;
    border-bottom-color: white;
    animation: ${rotate360} 0.8s ease infinite;
  }
`;

function HalfCircleRotate() {
  return <Spinner />;
}

export default HalfCircleRotate;
