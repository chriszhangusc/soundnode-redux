import React from 'react';
import { connect } from 'react-redux';
import * as searchActions from 'features/search/searchActions';
import PropTypes from 'prop-types';
import PageTitle from 'common/components/PageTitle';
import SearchResults from 'features/search/SearchResults';

import { Box } from 'grid-styled';
import { updateVisiblePlayQueueName } from 'features/playQueue/playQueueActions';

class Search extends React.Component {
  componentDidMount() {
    // Load query params from url
    const { match } = this.props;
    const { query } = match.params;
    this.props.updateVisiblePlayQueueName(`search-${query}`);
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
      this.props.updateVisiblePlayQueueName(`search-${newQuery}`);
      this.props.loadSearchResults(newQuery);
    }
  }

  componentWillUnmount() {
    this.props.resetSearchState();
  }

  render() {
    const { query } = this.props.match.params;
    // title={`Search results for ${query.toUpperCase()}`}

    return (
      <Box>
        <PageTitle>
          Search results for: {query.toUpperCase()}
        </PageTitle>
        <SearchResults />
      </Box>
    );
  }
}

Search.propTypes = {
  loadSearchResults: PropTypes.func.isRequired,
  updateVisiblePlayQueueName: PropTypes.func.isRequired,
  resetSearchState: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

const actions = {
  ...searchActions,
  updateVisiblePlayQueueName,
};

export default connect(null, actions)(Search);
