import React from 'react';
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
  return (
    <PlaylistWrapper>
      <Header playlist={playlist} />
      <TrackList playlist={playlist} />
    </PlaylistWrapper>
  );
}

export default Playlist;
