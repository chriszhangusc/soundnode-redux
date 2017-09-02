import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateVisiblePlayQueueName } from 'features/playQueue/playQueueActions';
import SongCardList from 'common/components/SongCardList';
import PageTitle from 'common/components/PageTitle';
import { getVisiblePlayQueue } from 'features/playQueue/playQueueSelectors';
import { isStreamFetching } from 'features/stream/streamSelectors';
import * as streamActions from 'features/stream/streamActions';
import { Box } from 'grid-styled';

class Stream extends React.Component {
  static propTypes = {
    fetching: PropTypes.bool.isRequired,
    trackIds: PropTypes.arrayOf(PropTypes.number),
    loadStream: PropTypes.func.isRequired,
    loadMoreStream: PropTypes.func.isRequired,
    resetStreamState: PropTypes.func.isRequired,
    updateVisiblePlayQueueName: PropTypes.func.isRequired,
  };

  static defaultProps = {
    fetching: false,
    trackIds: [],
  };

  componentDidMount() {
    this.props.updateVisiblePlayQueueName('stream');
    this.props.loadStream();
  }

  componentWillUnmount() {
    this.props.resetStreamState();
  }

  render() {
    const { fetching, trackIds, loadMoreStream } = this.props;
    return (
      <Box>
        <PageTitle>Stream</PageTitle>
        <SongCardList fetching={fetching} trackIds={trackIds} scrollFunc={loadMoreStream} />
      </Box>
    );
  }
}

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

export default connect(mapStateToProps, actions)(Stream);
