import React from 'react';
import Playlist from '@soundnode-redux/client/src/features/playlists/Playlist';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import withScrollToTopOnEnter from '@soundnode-redux/client/src/common/hocs/withScrollToTopOnEnter';
import { loadPlaylists, resetPlaylistsState } from '@soundnode-redux/client/src/features/playlists/playlistsActions';
import { getPlaylistIds } from '@soundnode-redux/client/src/features/playlists/playlistsSelectors';
import Wrapper from './Wrapper';

class Playlists extends React.Component {
  componentDidMount() {
    this.props.loadPlaylists();
  }

  componentWillUnmount() {
    this.props.resetPlaylistsState();
  }

  render() {
    const { playlistIds } = this.props;
    return (
      <Wrapper>
        {playlistIds.map(playlistId => <Playlist playlistId={playlistId} key={playlistId} />)}
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    playlistIds: getPlaylistIds(state),
  };
}

const actions = {
  loadPlaylists,
  resetPlaylistsState,
};

export default compose(connect(mapStateToProps, actions), withScrollToTopOnEnter)(Playlists);
