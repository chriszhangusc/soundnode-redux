import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getMyId } from 'features/auth/authSelectors';
import styled from 'styled-components';
import {
  updateFilterText,
  addToPlaylist,
} from 'features/modals/addToPlaylist/addToPlaylistActions';
import { fetchPlaylists } from 'features/playlists/playlistsActions';
import { centerFixed } from 'app/css/mixin';
import PlaylistCompact from 'features/modals/addToPlaylist/PlaylistCompact';
import { notificationSuccess } from 'features/notification/notificationActions';
import { getPlaylists } from 'features/playlists/playlistsSelectors';
import { getFilterText } from 'features/modals/addToPlaylist/addToPlaylistSelectors';

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
    this.props.actions.fetchPlaylists();
  }

  handleAddClick = (trackId, playlistId) => {
    this.props.actions.addToPlaylist(trackId, this.props.currentUserId, playlistId);
  };

  handleRemoveClick = (track, playlist) => {
    // removeTrackFromPlaylist(track.id, currentUserId, playlist.id).then(() => {
    //   const updater = [...this.state.playlists];
    //   updater.forEach(pl => {
    //     if (pl.id === playlist.id) {
    //       pl.tracks = pl.tracks.filter(t => t.id !== track.id);
    //     }
    //   });
    //   this.setState(updater);
    //   this.props.actions.notificationSuccess('Track removed from playlist');
    // });
  };

  handleFilterChange = e => {
    const filterText = e.target.value.toLowerCase();
    this.props.actions.updateFilterText(filterText);
  };

  render() {
    const { track, currentUserId, playlists, filterText } = this.props;
    return (
      <Wrapper>
        <Row>
          <Title>Where do you want to add: </Title>
          <TrackName>{track.title}</TrackName>
        </Row>
        <Row>
          <FilterInput placeholder="Filter playlists" onChange={this.handleFilterChange} />
        </Row>
        <Row>
          {playlists
            .filter(pl => pl.title.toLowerCase().indexOf(filterText) !== -1)
            .map(playlist => {
              const isAdded = playlist.tracks.includes(track.id) > 0;
              return (
                <PlaylistCompact
                  playlistId={playlist.id}
                  playlistTitle={playlist.title}
                  key={playlist.id}
                  isAdded={isAdded}
                  onClick={() => {
                    if (isAdded) {
                      this.handleRemoveClick(track.id, playlist.id);
                    } else {
                      this.handleAddClick(track.id, playlist.id);
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
    playlists: getPlaylists(state),
    filterText: getFilterText(state),
  };
}

const actions = {
  updateFilterText,
  notificationSuccess,
  fetchPlaylists,
  addToPlaylist,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToPlaylistModal);
