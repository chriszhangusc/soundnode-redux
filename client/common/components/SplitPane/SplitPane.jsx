import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const LeftWrapper = styled.div`margin-right: 30px;`;
const RightWrapper = styled.div``;

function SplitPane({ left, right }) {
  return (
    <Wrapper>
      <LeftWrapper>
        {left}
      </LeftWrapper>
      <RightWrapper>
        {right}
      </RightWrapper>
    </Wrapper>
  );
}

export default SplitPane;
