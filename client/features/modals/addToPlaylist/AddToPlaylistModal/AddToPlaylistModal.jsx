import React from 'react';
import { connect } from 'react-redux';
import { getMyId } from 'features/auth/authSelectors';
import styled from 'styled-components';
import {
  fetchMyPlaylists,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
} from 'common/services/scApi';
// import { normalizeResponse } from 'common/utils/normalizeUtils';
// import { playlistArraySchema } from 'app/schema';
import { centerFixed } from 'app/css/mixin';
import PlaylistCompact from 'features/modals/addToPlaylist/PlaylistCompact';
import { notificationSuccess } from 'features/notification/notificationActions';

const Wrapper = styled.div`
  width: 550px;
  max-height: 420px;
  overflow-y: scroll;
  ${centerFixed} z-index: ${props => props.theme.zIndexes[5]};
  background-color: ${props => props.theme.colors.bgDark};
  opacity: 0.95;
  box-shadow: 0 0 12px 8px ${props => props.theme.colors.boxShadowColor};
  padding: 20px;
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
    fetchMyPlaylists().then(playlists => {
      console.log(playlists);
      this.setState({ playlists: [...playlists] });
    });
  }

  refreshPlaylists = () => {
    return fetchMyPlaylists().then(playlists => {
      this.setState({ playlists: [...playlists] });
    });
  };

  handleAddClick = (track, currentUserId, playlist) => {
    // console.log('Adding', track.title, 'to', playlist.title);
    addTrackToPlaylist(track.id, currentUserId, playlist.id).then(() => {
      this.refreshPlaylists().then(() => {
        this.props.createToastr('Track added to playlist');
      });
    });
  };

  handleRemoveClick = (track, currentUserId, playlist) => {
    removeTrackFromPlaylist(track.id, currentUserId, playlist.id).then(() => {
      this.refreshPlaylists().then(() => {
        this.props.createToastr('Track removed from playlist');
      });
    });
  };

  render() {
    const { track, currentUserId } = this.props;
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
          {this.state.playlists.map(playlist => {
            const isAdded = playlist.tracks.filter(t => t.id === track.id).length > 0;
            return (
              <PlaylistCompact
                playlist={{ ...playlist }}
                key={playlist.id}
                isAdded={isAdded}
                onClick={() => {
                  if (isAdded) {
                    this.handleRemoveClick(track, currentUserId, playlist);
                  } else {
                    this.handleAddClick(track, currentUserId, playlist);
                  }
                }}
              />
            );
          })}
        </Row>
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUserId: getMyId(state),
  };
}

const actions = {
  createToastr: notificationSuccess,
};

export default connect(mapStateToProps, actions)(AddToPlaylistModal);
