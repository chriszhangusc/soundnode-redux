import React from 'react';
import DropdownSearchInput from '../DropdownSearchInput';
import DropdownSearchResults from '../DropdownSearchResults';

function DropdownSearch() {
  return (
    <div className="nav-search">
      <DropdownSearchInput />
      <DropdownSearchResults />
    </div>
  );
}

export default DropdownSearch;
