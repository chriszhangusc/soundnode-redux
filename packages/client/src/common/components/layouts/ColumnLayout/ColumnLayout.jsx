import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FlexColumn from '@soundnode-redux/client/src/common/components/layouts/FlexColumn';

const Section = styled.section`
  margin-bottom: 10px;
`;

const Wrapper = styled(FlexColumn)`
  position: relative;
  justify-content: flex-start;
  align-items: left;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
`;

function ColumnLayout({ children, width, height }) {
  return (
    <Wrapper width={width} height={height}>
      {React.Children.toArray(children).map(child => (
        <Section key={child.key}>{child}</Section>
      ))}
    </Wrapper>
  );
}

ColumnLayout.defaultProps = {
  width: '100%',
  height: '100%',
};

ColumnLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  width: PropTypes.PropTypes.string,
  height: PropTypes.PropTypes.string,
};

export default ColumnLayout;
