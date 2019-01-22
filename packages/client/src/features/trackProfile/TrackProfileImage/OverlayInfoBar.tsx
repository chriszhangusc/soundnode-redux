import * as React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
};

const Column = styled.span`
  flex-grow: 1;
  text-align: center;
`;

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  bottom: 0;
  height: 40px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
`;

function OverlayInfoBar({ children }: Props) {
  return (
    <Wrapper>
      {React.Children.map(children, child => (
        <Column>{child}</Column>
      ))}
    </Wrapper>
  );
}

export default OverlayInfoBar;
