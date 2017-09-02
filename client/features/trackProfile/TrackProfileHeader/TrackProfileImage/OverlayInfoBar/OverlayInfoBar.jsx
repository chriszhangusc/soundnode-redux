import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import Column from './Column';

function OverlayInfoBar({ children }) {
  return (
    <Wrapper>
      {React.Children.map(children, child =>
        <Column>
          {child}
        </Column>,
      )}
    </Wrapper>
  );
}

OverlayInfoBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default OverlayInfoBar;
