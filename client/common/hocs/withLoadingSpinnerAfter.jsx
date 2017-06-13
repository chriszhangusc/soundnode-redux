import React from 'react';
import Spinner from 'client/common/components/Spinner';
import styled from 'styled-components';

const SpinnerWrapper = styled.div`
  padding: 20px 0;
  margin: 0px auto;
  width: 100%;
`;

export default function withLoadingSpinnerAfter(WrappedComponent) {
  return function ComposedComponent({ fetching, ...rest }) {
    return (
      <div>
        <WrappedComponent {...rest} />
        {fetching && <SpinnerWrapper><Spinner /></SpinnerWrapper>}
      </div>
    );
  };
}
