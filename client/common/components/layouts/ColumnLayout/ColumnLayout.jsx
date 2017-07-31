import React from 'react';
import PropTypes from 'prop-types';
import Section from 'common/components/layouts/Section';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
`;

function ColumnLayout({ children, width, height }) {
  return (
    <Wrapper width={width} height={height}>
      {React.Children.toArray(children).map(child =>
        <Section key={child.key}>
          {child}
        </Section>,
      )}
    </Wrapper>
  );
}

ColumnLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ColumnLayout;
