import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SongCardList from 'common/components/SongCardList';
import PageTitle from 'common/components/PageTitle';
import { isStreamFetching, getStreamIds } from 'features/stream/streamSelectors';
import * as streamActions from 'features/stream/streamActions';

class Stream extends React.Component {
  static propTypes = {
    fetching: PropTypes.bool.isRequired,
    trackIds: PropTypes.arrayOf(PropTypes.number),
    loadStream: PropTypes.func.isRequired,
    loadMoreStream: PropTypes.func.isRequired,
    resetStreamState: PropTypes.func.isRequired,
  };

  static defaultProps = {
    fetching: false,
    trackIds: [],
  };

  componentDidMount() {
    this.props.loadStream();
  }

  componentWillUnmount() {
    this.props.resetStreamState();
  }

  render() {
    const { fetching, trackIds, loadMoreStream } = this.props;
    return (
      <div>
        <PageTitle>Stream</PageTitle>
        <SongCardList fetching={fetching} trackIds={trackIds} scrollFunc={loadMoreStream} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fetching: isStreamFetching(state),
    trackIds: getStreamIds(state),
  };
}

export default connect(mapStateToProps, streamActions)(Stream);
