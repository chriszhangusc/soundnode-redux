import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CoverImageDetailsWrapper = styled.div`
  position: absolute;
  display: flex;
  bottom: 0;
  height: 40px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
`;

const Column = styled.span`
  flex-grow: 1;
  text-align: center;
`;

function OverlayInfoBar({ children }) {
  return (
    <CoverImageDetailsWrapper>
      {React.Children.map(children, child =>
        <Column>
          {child}
        </Column>,
      )}
    </CoverImageDetailsWrapper>
  );
}

OverlayInfoBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default OverlayInfoBar;
