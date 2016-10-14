import React, { PropTypes } from 'react';
import SearchResultListContainer from '../containers/SearchResultListContainer';

const SearchResults = ({ location: { query } }) => {
  const keyword = query.q;
  const title = `Results for: ${keyword}`;
  return (
    <div className="container">
      <h1 className="search-results-title">{title}</h1>
      <SearchResultListContainer />
    </div>
  );
};

SearchResults.propTypes = {
  location: PropTypes.object
};

export default SearchResults;
