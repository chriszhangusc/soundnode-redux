import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 150px;
  height: 200px;
  z-index: ${props => props.theme.zIndexes[4]};
  background: ${props => props.theme.colors.bg};
  position: absolute;
  box-shadow: 0 0 12px 8px ${props => props.theme.colors.boxShadowColor};
  border: solid 0px;
  border-radius: 5px;
  display: none;
  right: 0;
  top: 0;
`;

function DropdownList() {
  return <Wrapper />;
}

export default DropdownList;
