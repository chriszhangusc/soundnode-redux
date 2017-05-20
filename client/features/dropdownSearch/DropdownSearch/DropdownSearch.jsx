import React from 'react';
import styled from 'styled-components';
import DropdownSearchInput from '../DropdownSearchInput';
import DropdownSearchResults from '../DropdownSearchResults';

const DropdownSearchWrapper = styled.div`
    padding: 20px 0;
    display: inline-block;
    border-radius: 3px;
`;

function DropdownSearch() {
  return (
    <DropdownSearchWrapper>
      <DropdownSearchInput />
      <DropdownSearchResults />
    </DropdownSearchWrapper>
  );
}

export default DropdownSearch;
