import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from './Header';
import TrackList from './TrackList';

const PlaylistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 50px;
  margin-bottom: 30px;
`;

function Playlist({ playlist }) {
  // Compute total duration of playlist
  return (
    <PlaylistWrapper>
      <Header playlist={playlist} />
      <TrackList tracks={playlist.tracks} />
    </PlaylistWrapper>
  );
}

Playlist.propTypes = {
  playlist: PropTypes.object.isRequired,
};

export default Playlist;
