import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getProfiledTrack } from 'client/features/trackProfile/trackProfileSelectors';
import { getLargeVersion } from 'client/common/utils/imageUtils';
import { isTrackActive, isTrackPlaying } from 'client/features/player/playerSelectors';

const Wrapper = styled.div`
  width: 350px;
  height: 350px;
  position: relative;
  font-size: 0;
  display: flex;
`;

const TrackButton = styled.span`
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

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
`;

// Extract TrackButton

function TrackCoverImage({ src, playing, active, handleImageClick, liked }) {
  return (
    <Wrapper>
      <TrackButton active={active}>
        {playing ? <i className="fa fa-pause" /> : <i className="fa fa-play" />}
      </TrackButton>
      <CoverImage src={src} />
    </Wrapper>
  );
}

TrackCoverImage.defaultProps = {
  src: '',
  playing: false,
  active: false,
  liked: false,
};

TrackCoverImage.propTypes = {
  src: PropTypes.string,
  playing: PropTypes.bool,
  active: PropTypes.bool,
  liked: PropTypes.bool,
  handleImageClick: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const track = getProfiledTrack(state);
  return {
    src: track && getLargeVersion(track.artworkUrl),
    playing: track && isTrackPlaying(state, track.id),
    active: track && isTrackActive(state, track.id),
    liked: false,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleImageClick() {
      console.log('Play/Pause');
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackCoverImage);
