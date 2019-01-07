import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import withScrollToTopOnEnter from '@soundnode-redux/client/src/common/hocs/withScrollToTopOnEnter';
import * as searchActions from '@soundnode-redux/client/src/features/search/searchActions';
import PropTypes from 'prop-types';
import PageTitle from '@soundnode-redux/client/src/common/components/PageTitle';
import SearchResults from '@soundnode-redux/client/src/features/search/SearchResults';

class Search extends React.Component {
  componentDidMount() {
    // Load query params from url
    const { match } = this.props;
    const { query } = match.params;
    this.props.loadSearchResults(query);
  }

  componentWillReceiveProps(nextProps) {
    const curQuery = this.props.match.params.query;
    const newQuery = nextProps.match.params.query;
    // If curQuery is undefined, it means this is the initial loading which is already
    // handled by CWM,
    // Check curQuery and newQuery to detect jumping from one track to another track.
    if (curQuery !== newQuery && curQuery) {
      // Before jumping to new track profile page, clear old state.
      // this.props.clearSearchState();
      this.props.loadSearchResults(newQuery);
    }
  }

  componentWillUnmount() {
    this.props.resetSearchState();
  }

  render() {
    const { query } = this.props.match.params;

    return (
      <div>
        <PageTitle>Search results for: {query.toUpperCase()}</PageTitle>
        <SearchResults />
      </div>
    );
  }
}

Search.propTypes = {
  loadSearchResults: PropTypes.func.isRequired,
  resetSearchState: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

export default compose(connect(null, searchActions), withScrollToTopOnEnter)(Search);
