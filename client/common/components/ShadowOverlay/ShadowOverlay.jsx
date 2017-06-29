// import React from 'react';
import styled from 'styled-components';

const ShadowOverlay = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  width: 100%;
  position: absolute;
  top: 0;
  height: 100%;
  opacity: ${props => (props.active ? 1 : 0)};
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  transition: all 200ms ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

export default ShadowOverlay;
