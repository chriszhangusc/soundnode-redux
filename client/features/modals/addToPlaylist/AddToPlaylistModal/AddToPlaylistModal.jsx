import React from 'react';
import styled from 'styled-components';
import { fetchMyPlaylists } from 'common/services/scApi';
// import { normalizeResponse } from 'common/utils/normalizeUtils';
// import { playlistArraySchema } from 'app/schema';
import PlaylistCompact from 'features/modals/addToPlaylist/PlaylistCompact';

const Wrapper = styled.div`
  width: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: ${props => props.theme.zIndexes[5]};
  background-color: #121314;
  opacity: 0.95;
  box-shadow: 0 0 12px 8px ${props => props.theme.colors.boxShadowColor};
  padding: 20px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: block;
  margin-top: 20px;
`;

const Title = styled.span`
  font-size: 1.05rem;
  font-weight: bold;
  color: ${props => props.theme.colors.fontColorSub};
`;

const TrackName = styled.span`
  font-size: 1.05rem;
  color: ${props => props.theme.colors.fontColor};
`;

const FilterInput = styled.input`
  width: 100%;
  display: inline-block;
  border: none;
  text-align: left;
  font-family: 'Open Sans';
  font-size: 1rem;
  outline: 0;
  border-radius: 5px;
  padding: 6px 10px 6px 10px;
  font-weight: 300;
  background-color: #333333;
  height: 30px;
`;

class AddToPlaylistModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /* initial state */
      playlists: [],
    };
  }

  componentDidMount() {
    // Fetch all playlists of current user
    fetchMyPlaylists().then((playlists) => {
      console.log(playlists);
      this.setState({ playlists });
    });
  }

  handleAddClick = (track, playlist, e) => {
    e.preventDefault();
    console.log('Adding', track.title, 'to', playlist.title);
  };

  render() {
    const { track } = this.props;
    return (
      <Wrapper>
        <Row>
          <Title>Where do you want to add: </Title>
          <TrackName>{track.title}</TrackName>
        </Row>
        <Row>
          <FilterInput placeholder="Filter playlists" />
        </Row>
        <Row>
          {this.state.playlists.map(playlist => (
            <PlaylistCompact
              playlist={playlist}
              key={playlist.id}
              onClick={() => {
                this.handleAddClick(track, playlist);
              }}
            />
          ))}
        </Row>
      </Wrapper>
    );
  }
}

export default AddToPlaylistModal;
