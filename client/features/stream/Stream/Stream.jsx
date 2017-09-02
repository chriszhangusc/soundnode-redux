import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateVisiblePlayQueueName } from 'features/playQueue/playQueueActions';
import SongCardList from 'common/components/SongCardList';
import PageTitle from 'common/components/PageTitle';
import { getVisiblePlayQueue } from 'features/playQueue/playQueueSelectors';
import { isStreamFetching } from 'features/stream/streamSelectors';
import { bindActionCreators } from 'redux';
import * as streamActions from 'features/stream/streamActions';
import { Box } from 'grid-styled';

class Stream extends React.Component {
  componentDidMount() {
    this.props.updateVisiblePlayQueueName('stream');
    this.props.loadStream();
  }

  componentWillUnmount() {
    this.props.resetStreamState();
  }

  render() {
    return (
      <Box>
        <PageTitle>Stream</PageTitle>
        <SongCardList {...this.props} />
      </Box>
    );
  }
}

Stream.propTypes = {
  loadStream: PropTypes.func.isRequired,
  resetStreamState: PropTypes.func.isRequired,
  updateVisiblePlayQueueName: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    fetching: isStreamFetching(state),
    trackIds: getVisiblePlayQueue(state),
  };
}

const actions = {
  ...streamActions,
  updateVisiblePlayQueueName,
};

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(actions, dispatch),
    scrollFunc() {
      dispatch(streamActions.loadMoreStream());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
