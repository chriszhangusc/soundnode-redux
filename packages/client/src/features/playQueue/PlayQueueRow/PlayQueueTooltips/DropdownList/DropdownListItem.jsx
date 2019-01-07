import React from 'react';
import styled from 'styled-components';
import Icon from '@soundnode-redux/client/src/common/components/icons/Icon';
import RouterLink from '@soundnode-redux/client/src/common/components/links/RouterLink';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  color: ${props => props.theme.colors.fontColor};
  border-bottom: 1px solid ${props => props.theme.colors.separatorDark};
  &:hover {
    background-color: ${props => props.theme.colors.separatorDark};
  }
`;

function DropdownListItem({ to, iconName, text, onClick }) {
  const wrapWithLink = component => (to ? <RouterLink to={to}>{component}</RouterLink> : component);

  const component = (
    <Wrapper onClick={onClick}>
      <Icon iconName={iconName} mr="5px" /> {text}
    </Wrapper>
  );

  return wrapWithLink(component);
}

export default DropdownListItem;
