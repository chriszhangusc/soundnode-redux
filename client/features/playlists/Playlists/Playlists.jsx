import React from 'react';
import { fetchMyPlaylists } from 'features/playlists/playlistsApi';
import Playlist from 'features/playlists/Playlist';
import Wrapper from './Wrapper';

class Playlists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
    };
  }

  componentDidMount() {
    // Go fetch all playlists of current logged in user.
    fetchMyPlaylists().then((playlists) => {
      this.setState({
        playlists,
      });
    });
  }

  render() {
    return (
      <Wrapper>
        {this.state.playlists.map(
          playlist =>
            playlist &&
            playlist.tracks.length > 0 && <Playlist playlist={playlist} key={playlist.id} />,
        )}
      </Wrapper>
    );
  }
}

export default Playlists;
