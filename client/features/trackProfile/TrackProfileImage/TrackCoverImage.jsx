import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getProfiledTrack } from 'client/features/trackProfile/trackProfileSelectors';
import { getLargeVersion } from 'client/common/utils/imageUtils';
import { isTrackActive, isTrackPlaying } from 'client/features/player/playerSelectors';
import { FormattedNumber } from 'react-intl';

const Wrapper = styled.div`
  width: 350px;
  height: 350px;
  position: relative;
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
      <TrackButton active={active}>
        {playing ? <i className="fa fa-pause" /> : <i className="fa fa-play" />}
      </TrackButton>
      <CoverImage src={src} />
      <CoverImageDetailsWrapper>
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
  console.log(track);
  return {
    src: track && getLargeVersion(track.artworkUrl),
    playing: track && isTrackPlaying(state, track.id),
    active: track && isTrackActive(state, track.id),
    liked: false,
    likesCount: track && track.favoritingsCount,
    playbackCount: track && track.playbackCount,
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
