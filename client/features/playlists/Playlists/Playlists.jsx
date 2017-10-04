import React from 'react';
import { fetchMyPlaylists } from 'features/playlists/playlistsApi';
import styled from 'styled-components';
import Playlist from 'features/playlists/Playlist';

const Wrapper = styled.div`
  max-width: 1856px;
  margin-left: auto;
  margin-right: auto;
`;

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
      <Wrapper>{this.state.playlists.map(playlist => <Playlist playlist={playlist} />)}</Wrapper>
    );
  }
}

export default Playlists;
