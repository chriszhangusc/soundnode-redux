import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { THEME_COLOR } from 'client/app/css/colors';
import EnhancedImage from 'client/common/components/Images/EnhancedImage';

const Wrapper = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  margin-bottom: 10px;
`;

const PlaybackButtonWrapper = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  width: 100%;
  position: absolute;
  top: 0;
  height: 100%;
  opacity: ${props => (props.active ? 1 : 0)};
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  transition: all 200ms ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

const PlaybackButtonIcon = styled.i`
  display: inline-block;
  font-size: 2rem;
  color: ${THEME_COLOR}
`;

function SongCardImage({ active, playing, artworkUrl, handleImageClick }) {
  return (
    <Wrapper>
      <PlaybackButtonWrapper active={active} onClick={handleImageClick}>
        <PlaybackButtonIcon className={`${playing ? 'ion-ios-pause' : 'ion-ios-play'}`} />
      </PlaybackButtonWrapper>
      {artworkUrl && <EnhancedImage src={artworkUrl} />}
    </Wrapper>
  );
}

SongCardImage.defaultProps = {
  artworkUrl: '',
  artworkUrlSmall: '',
};

SongCardImage.propTypes = {
  active: PropTypes.bool.isRequired,
  playing: PropTypes.bool.isRequired,
  artworkUrl: PropTypes.string,
  // artworkUrlBlur: PropTypes.string,
  handleImageClick: PropTypes.func.isRequired,
};

export default SongCardImage;
