import React from 'react';
import Wrapper from './Wrapper';
import DropdownSearchBox from '../DropdownSearchBox';
import DropdownSearchResults from '../DropdownSearchResults';

function DropdownSearch() {
  return (
    <Wrapper>
      <DropdownSearchBox />
      <DropdownSearchResults />
    </Wrapper>
  );
}

export default DropdownSearch;
