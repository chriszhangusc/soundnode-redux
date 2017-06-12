import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
`;

export default function AuthRequired() {
  return (
    <Wrapper>
      <h1>Please Signin With SoundCloud First</h1>
    </Wrapper>
  );
}
