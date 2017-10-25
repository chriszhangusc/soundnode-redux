import React from 'react';
import styled from 'styled-components';
import Icon from 'common/components/icons/Icon';

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

function DropdownListItem({ type, iconName, text, onClick }) {
  return (
    <Wrapper onClick={onClick}>
      <Icon iconName={iconName} mr="5px" /> {text}
    </Wrapper>
  );
}

export default DropdownListItem;
