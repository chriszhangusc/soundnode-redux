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
    margin-top: -10px;
    margin-left: -10px;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: ${props => props.color || props.theme.colors.fontColor};
    border-bottom-color: ${props => props.color || props.theme.colors.fontColor};
    animation: ${rotate360} 0.8s ease infinite;
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: 30px; /* For now the position of this spinner relies on this property, this is not correct, fix it later */
  height: 20px;
`;

function HalfCircleRotate() {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
}

export default HalfCircleRotate;
