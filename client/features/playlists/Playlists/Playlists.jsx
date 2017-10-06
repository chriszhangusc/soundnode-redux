import React from 'react';
import Playlist from 'features/playlists/Playlist';
import { connect } from 'react-redux';
import { loadPlaylists } from 'features/playlists/playlistsActions';
import { getPlaylistIds } from 'features/playlists/playlistsSelectors';
import Wrapper from './Wrapper';

class Playlists extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     playlists: [],
  //   };
  // }

  componentDidMount() {
    // Go fetch all playlists of current logged in user.
    // fetchMyPlaylists().then((playlists) => {
    //   this.setState({
    //     playlists,
    //   });
    // });

    this.props.loadPlaylists();
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
};

export default connect(mapStateToProps, actions)(Playlists);
