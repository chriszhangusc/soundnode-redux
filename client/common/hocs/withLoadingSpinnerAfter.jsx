import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'common/components/Spinner';
import styled from 'styled-components';
import { Box } from 'grid-styled';
import { getDisplayName } from 'common/utils/hocUtils';

const SpinnerWrapper = styled.div`
  padding: 20px 0;
  margin: 0px auto;
  width: 100%;
`;

export default function withLoadingSpinnerAfter(WrappedComponent) {
  function EnhancedComponent({ fetching, ...rest }) {
    return (
      <Box>
        <WrappedComponent {...rest} />
        {fetching &&
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>}
      </Box>
    );
  }

  EnhancedComponent.displayName = `WithLoadingSpinnerAfter(${getDisplayName(WrappedComponent)})`;

  EnhancedComponent.propTypes = {
    fetching: PropTypes.bool.isRequired,
  };

  return EnhancedComponent;
}
