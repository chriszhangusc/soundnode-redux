import React from 'react';
import PropTypes from 'prop-types';
import Image from 'common/components/images/Image';
import PlaybackOverlay from 'common/components/PlaybackOverlay';
import { connect } from 'react-redux';
import { isTrackActive, isTrackPlaying } from 'features/player/playerSelectors';
import { changeSongAndPlay, playSong, pauseSong } from 'features/player/playerActions';
import { switchActivePlaylistIfNeeded } from 'features/playlist/playlistActions';
import { getLargeVersion } from 'common/utils/imageUtils';
import { getUserById } from 'features/entities/entitiesSelectors';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 206px;
  height: 206px;
`;

function SongCardImage({ active, playing, artworkUrl, handleImageClick }) {
  return (
    <Wrapper>
      <PlaybackOverlay active={active} onClick={handleImageClick} playing={playing} >
        <Image src={artworkUrl} />
      </PlaybackOverlay>
    </Wrapper>
  );
}

SongCardImage.defaultProps = {
  artworkUrl: '',
};

SongCardImage.propTypes = {
  active: PropTypes.bool.isRequired,
  playing: PropTypes.bool.isRequired,
  artworkUrl: PropTypes.string,
  handleImageClick: PropTypes.func.isRequired,
};

function mapStateToProps(state, { track }) {
  const user = getUserById(state, track.userId);
  return {
    artworkUrl: getLargeVersion(track.artworkUrl || user.avatarUrl),
    active: isTrackActive(state, track.id),
    playing: isTrackPlaying(state, track.id),
  };
}

// This is useful when you need to compute some action using stateProps
function mergeProps(stateProps, { dispatch }, { track }) {
  return {
    ...stateProps,
    // Besides doing it this way, we could also do it in a thunk function
    // or pass all args into components and assemble there
    handleImageClick() {
      if (!stateProps.active) {
        // Change song first and then switch active playlist
        dispatch(changeSongAndPlay(track.id));
        dispatch(switchActivePlaylistIfNeeded());
      } else {
        dispatch(stateProps.playing ? pauseSong() : playSong());
      }
    },
  };
}

export default connect(mapStateToProps, null, mergeProps)(SongCardImage);
