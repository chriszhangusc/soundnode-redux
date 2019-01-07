import React from 'react';
import { connect } from 'react-redux';
import PlaybackOverlay from '@soundnode-redux/client/src/common/components/PlaybackOverlay';
import { playPlaylist } from '@soundnode-redux/client/src/features/playlists/playlistsActions';
import { isPlayerLoading, isPlayerPlaying } from '@soundnode-redux/client/src/features/player/playerSelectors';
import { getLargeVersion } from '@soundnode-redux/client/src/common/utils/imageUtils';
import { getTracksByPlaylistId } from '@soundnode-redux/client/src/features/entities/entitiesSelectors';
import { getPlayQueueName } from '@soundnode-redux/client/src/features/playQueue/playQueueSelectors';
import ImageGrid from '@soundnode-redux/client/src/common/components/images/ImageGrid';
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
  const activePlayQueueName = getPlayQueueName(state); // if current playlist is being played
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
