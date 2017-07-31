import React from 'react';
import PropTypes from 'prop-types';
import Section from 'common/components/layouts/Section';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

// Rename to a more general name like RowLayout?
function PageHeaderInfoLayout({ children }) {
  return (
    <Wrapper>
      {React.Children.toArray(children).map(child => (
        <Section key={child.key}>
          {child}
        </Section>
        ))}
    </Wrapper>
  );
}

PageHeaderInfoLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default PageHeaderInfoLayout;
