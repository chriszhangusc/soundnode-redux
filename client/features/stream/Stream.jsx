import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateVisiblePlaylistName } from 'features/playQueue/playlistActions';
import SongCardList from 'common/components/SongCardList';
import PageTitle from 'common/components/PageTitle';
import { getVisiblePlaylist } from 'features/playQueue/playlistSelectors';
import { isStreamFetching } from 'features/stream/streamSelectors';
import { bindActionCreators } from 'redux';
import * as streamActions from 'features/stream/streamActions';
import { Box } from 'grid-styled';

class Stream extends React.Component {
  componentDidMount() {
    this.props.updateVisiblePlaylistName('stream');
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
  updateVisiblePlaylistName: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    fetching: isStreamFetching(state),
    trackIds: getVisiblePlaylist(state),
  };
}

const actions = {
  ...streamActions,
  updateVisiblePlaylistName,
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
