import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getProfiledTrack } from 'features/trackProfile/trackProfileSelectors';
import { getLargeVersion } from 'common/utils/imageUtils';
import { isTrackActive, isTrackPlaying } from 'features/player/playerSelectors';
import { FormattedNumber } from 'react-intl';
import { changeSongAndPlay, playSong, pauseSong } from 'features/player/playerActions';
import Image from 'common/components/images/Image';

const Wrapper = styled.div`
  width: 350px;
  height: 350px;
  position: relative;
  display: flex;
`;

const PlaybackButton = styled.span`
  cursor: pointer;
  display: flex;
  font-size: 50px;
  width: 100%;
  position: absolute;
  top: 0;
  height: 100%;
  opacity: ${props => (props.active ? 1 : 0)};
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  transition: all 200ms ease-in-out;
  align-items: center;
  justify-content: center;

  & i {
    display: inline-block;
  }

  &:hover {
    opacity: 1;
  }
`;

const CoverImageDetailsWrapper = styled.div`
  position: absolute;
  display: flex;
  bottom: 0;
  height: 40px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  & i {
    display: inline-block;
  }
  align-items: center;
  justify-content: center;

  & span {
    font-size: 1rem;
    flex-grow: 1;
    text-align: center;
    margin-right: 5px;
  }
`;

// Extract TrackButton
function TrackCoverImage({
  src,
  playing,
  active,
  handleImageClick,
  liked,
  playbackCount,
  likesCount,
}) {
  return (
    <Wrapper>
      <PlaybackButton active={active} onClick={handleImageClick}>
        <i className={`fa ${playing ? 'fa-pause' : 'fa-play'}`} />
      </PlaybackButton>
      <Image src={src} onClick={handleImageClick} />
      <CoverImageDetailsWrapper onClick={handleImageClick}>
        <span>
          <i className="fa fa-play" /> <FormattedNumber value={playbackCount || 0} />
        </span>
        <span>
          <i className="fa fa-heart" /> <FormattedNumber value={likesCount || 0} />
        </span>
      </CoverImageDetailsWrapper>
    </Wrapper>
  );
}

TrackCoverImage.defaultProps = {
  src: '',
  playing: false,
  active: false,
  liked: false,
  playbackCount: 0,
  likesCount: 0,
};

TrackCoverImage.propTypes = {
  src: PropTypes.string,
  playing: PropTypes.bool,
  active: PropTypes.bool,
  liked: PropTypes.bool,
  handleImageClick: PropTypes.func.isRequired,
  playbackCount: PropTypes.number,
  likesCount: PropTypes.number,
};

function mapStateToProps(state) {
  const track = getProfiledTrack(state);
  return {
    trackId: track && track.id,
    src: track && getLargeVersion(track.artworkUrl),
    playing: track && isTrackPlaying(state, track.id),
    active: track && isTrackActive(state, track.id),
    liked: false,
    likesCount: track && (track.favoritingsCount || track.likesCount),
    playbackCount: track && track.playbackCount,
  };
}

// This is useful when you need to compute some action using stateProps
function mergeProps(stateProps, { dispatch }) {
  const { trackId, active, playing } = stateProps;
  return {
    ...stateProps,
    // Besides doing it this way, we could also do it in a thunk function
    // or pass all args into components and assemble there
    handleImageClick() {
      if (!trackId) return;
      if (!active) {
        dispatch(changeSongAndPlay(trackId));
      } else {
        dispatch(playing ? pauseSong() : playSong());
      }
    },
  };
}

export default connect(mapStateToProps, null, mergeProps)(TrackCoverImage);
