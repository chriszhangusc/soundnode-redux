import React from 'react';
import styled from 'styled-components';
import DropdownSearchBox from '../DropdownSearchBox';
import DropdownSearchResults from '../DropdownSearchResults';

const DropdownSearchWrapper = styled.div`
    display: flex;
    padding: 20px 0;
    border-radius: 3px;
    flex: 1;
    position: relative;
    max-width: 580px;
`;


function DropdownSearch() {
  return (
    <DropdownSearchWrapper>
      <DropdownSearchBox />
      <DropdownSearchResults />
    </DropdownSearchWrapper>
  );
}

export default DropdownSearch;
