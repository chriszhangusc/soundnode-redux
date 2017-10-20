import React from 'react';
import { connect } from 'react-redux';
import PlaybackOverlay from 'common/components/PlaybackOverlay';
import { playPlaylist } from 'features/playlists/playlistsActions';
import { isPlayerLoading, isPlayerPlaying } from 'features/player/playerSelectors';
import { getLargeVersion } from 'common/utils/imageUtils';
import { getTracksByPlaylistId } from 'features/entities/entitiesSelectors';
import { getActivePlayQueueName } from 'features/playQueue/playQueueSelectors';
import ImageGrid from 'common/components/images/ImageGrid';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 200px;
  width: 200px;
  /* This is for playback overlay */
  position: relative;
`;

function ProfileImage({
  playlistId,
  handleImageClick,
  playerLoading,
  playlistPlaying,
  playlistActive,
  images,
}) {
  return (
    <Wrapper>
      <ImageGrid images={images} />
      <PlaybackOverlay
        active={playlistActive}
        onClick={() => {
          handleImageClick(playlistId);
        }}
        loading={playerLoading}
        playing={playlistPlaying}
      />
    </Wrapper>
  );
}

const actions = {
  handleImageClick: playPlaylist,
};

function mapStateToProps(state, { playlistId }) {
  const tracks = getTracksByPlaylistId(state, playlistId);
  const activePlayQueueName = getActivePlayQueueName(state); // if current playlist is being played
  const isPlaylistActive = activePlayQueueName === `playlists-${playlistId}`;

  return {
    playerLoading: isPlayerLoading(state),
    // If current playlist is playing
    playlistPlaying: isPlaylistActive && isPlayerPlaying(state),
    playlistActive: isPlaylistActive,
    /* Optimize using reselect? https://stackoverflow.com/questions/40291084/use-reselect-selector-with-parameters */
    images: tracks.map(track => getLargeVersion(track.artworkUrl)).slice(0, 4),
  };
}

export default connect(mapStateToProps, actions)(ProfileImage);
