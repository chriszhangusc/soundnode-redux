import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as selectors from 'features/trackProfile/trackProfileSelectors';
import { updateActiveTrackIdAndPlay, playSong, pauseSong } from 'features/player/playerActions';
import TrackImage from 'common/components/images/TrackImage';

const Wrapper = styled.div`
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
function TrackProfileImage({
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
      {/* Track Image */}
      <TrackImage src={src} size="large" onClick={handleImageClick} />
      {/* Track Image Overlay */}
      <PlaybackButton active={active} onClick={handleImageClick}>
        <i className={`fa ${playing ? 'fa-pause' : 'fa-play'}`} />
      </PlaybackButton>
      <CoverImageDetailsWrapper onClick={handleImageClick}>
        <span>
          <i className="fa fa-play" />
          {playbackCount}
        </span>
        <span>
          <i className="fa fa-heart" />
          {likesCount}
        </span>
      </CoverImageDetailsWrapper>
    </Wrapper>
  );
}

TrackProfileImage.defaultProps = {
  src: '',
  playing: false,
  active: false,
  liked: false,
  playbackCount: '',
  likesCount: '',
};

TrackProfileImage.propTypes = {
  src: PropTypes.string,
  playing: PropTypes.bool,
  active: PropTypes.bool,
  liked: PropTypes.bool,
  handleImageClick: PropTypes.func.isRequired,
  playbackCount: PropTypes.string,
  likesCount: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    trackId: selectors.getProfiledTrackId(state),
    src: selectors.getProfiledTrackArtworkUrl(state),
    playing: selectors.isProfiledTrackPlaying(state),
    active: selectors.isProfiledTrackActive(state),
    liked: selectors.isProfiledTrackLiked(state),
    likesCount: selectors.getProfiledTrackLikesCount(state),
    playbackCount: selectors.getProfiledTrackPlaybackCount(state),
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
        dispatch(updateActiveTrackIdAndPlay(trackId));
      } else {
        dispatch(playing ? pauseSong() : playSong());
      }
    },
  };
}

export default connect(mapStateToProps, null, mergeProps)(TrackProfileImage);
