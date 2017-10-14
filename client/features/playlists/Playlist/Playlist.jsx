import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getPlaylistById, getTracksByPlaylistId } from 'features/entities/entitiesSelectors';
import Header from './Header';
import TrackList from './TrackList';

const PlaylistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 50px;
  margin-bottom: 30px;
`;

function Playlist({ playlist, playlistTracks }) {
  // Compute total duration of playlist

  return (
    <PlaylistWrapper>
      <Header playlist={playlist} />
      {playlistTracks && playlistTracks.length > 0 && <TrackList tracks={playlistTracks} />}
    </PlaylistWrapper>
  );
}

function mapStateToProps(state, { playlistId }) {
  return {
    playlist: getPlaylistById(state, playlistId),
    playlistTracks: getTracksByPlaylistId(state, playlistId),
  };
}

export default connect(mapStateToProps)(Playlist);
