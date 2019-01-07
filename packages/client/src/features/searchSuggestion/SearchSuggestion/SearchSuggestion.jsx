import React from 'react';
import Wrapper from './Wrapper';
import SearchSuggestionBox from '../SearchSuggestionBox';
import SearchSuggestionResults from '../SearchSuggestionResults';

function SearchSuggestion() {
  return (
    <Wrapper>
      <SearchSuggestionBox />
      <SearchSuggestionResults />
    </Wrapper>
  );
}

export default SearchSuggestion;
