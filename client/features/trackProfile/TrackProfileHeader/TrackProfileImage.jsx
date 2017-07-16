import React from 'react';
import PropTypes from 'prop-types';
import TrackImage from 'common/components/images/TrackImage';
import PlaybackOverlay from 'common/components/PlaybackOverlay';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: flex;
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
function TrackProfileImage({ src, playing, active, liked, playbackCount, likesCount, onClick }) {
  return (
    <Wrapper>
      <PlaybackOverlay playing={playing} active={active} onClick={onClick}>
        <TrackImage src={src} size="large" />
      </PlaybackOverlay>
      <CoverImageDetailsWrapper>
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
  trackId: null,
  onClick: null,
};

TrackProfileImage.propTypes = {
  src: PropTypes.string,
  playing: PropTypes.bool,
  active: PropTypes.bool,
  liked: PropTypes.bool,
  playbackCount: PropTypes.string,
  likesCount: PropTypes.string,
  onClick: PropTypes.func,
};

export default TrackProfileImage;
