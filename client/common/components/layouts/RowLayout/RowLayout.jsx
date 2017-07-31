import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

const Section = styled.section`margin-right: 25px;`;

// Rename to a more general name like RowLayout?
function RowLayout({ children }) {
  return (
    <Wrapper>
      {React.Children.toArray(children).map(child =>
        <Section key={child.key}>
          {child}
        </Section>,
      )}
    </Wrapper>
  );
}

RowLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default RowLayout;
