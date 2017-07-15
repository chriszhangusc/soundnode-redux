import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
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

SplitPane.defaultProps = {
  left: null,
  right: null,
};

SplitPane.propTypes = {
  left: PropTypes.node,
  right: PropTypes.node,
};

export default SplitPane;
