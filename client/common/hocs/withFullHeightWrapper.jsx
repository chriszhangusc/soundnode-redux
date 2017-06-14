import React from 'react';
import styled from 'styled-components';
import { getDisplayName } from 'client/common/utils/hocUtils';

// Extend the viewport to the full height of the browser,
// this is to solve fetch on scroll not triggering when there is too few content.

const Wrapper = styled.div`
  position: absolute;
  height: 100%;
`;

export default function withFullHeightWrapper(WrappedComponent) {
  function EnhancedComponent(props) {
    return (
      <Wrapper>
        <WrappedComponent {...props} />
      </Wrapper>
    );
  }

  EnhancedComponent.displayName = `WithFullHeightWrapper(${getDisplayName(WrappedComponent)})`;

  return EnhancedComponent;
}
