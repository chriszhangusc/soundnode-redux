import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import withScrollToTopOnEnter from '@soundnode-redux/client/src/common/hocs/withScrollToTopOnEnter';
import SongCardList from '@soundnode-redux/client/src/common/components/SongCardList';
import PageTitle from '@soundnode-redux/client/src/common/components/PageTitle';
import { isStreamFetching, getStreamPlaylist } from '@soundnode-redux/client/src/features/stream/streamSelectors';
import * as streamActions from '@soundnode-redux/client/src/features/stream/streamActions';

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
    const { fetching, playlist, loadMoreStream } = this.props;
    return (
      <div>
        <PageTitle>Stream</PageTitle>
        <SongCardList
          playlist={playlist}
          trackIds={playlist.trackIds}
          fetching={fetching}
          scrollFunc={loadMoreStream}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fetching: isStreamFetching(state),
    playlist: getStreamPlaylist(state),
  };
}

export default compose(connect(mapStateToProps, streamActions), withScrollToTopOnEnter)(Stream);
