import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { THEME_COLOR } from 'app/css/colors';
import EnhancedImage from 'common/components/images/EnhancedImage';
import ShadowOverlay from 'common/components/ShadowOverlay';

const Wrapper = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  margin-bottom: 10px;
`;

const PlaybackButtonIcon = styled.i`
  display: inline-block;
  font-size: 2rem;
  color: ${THEME_COLOR}
`;

function SongCardImage({ active, playing, artworkUrl, handleImageClick }) {
  return (
    <Wrapper>
      <ShadowOverlay active={active} onClick={handleImageClick}>
        <PlaybackButtonIcon className={`${playing ? 'ion-ios-pause' : 'ion-ios-play'}`} />
      </ShadowOverlay>
      {artworkUrl && <EnhancedImage src={artworkUrl} />}
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

export default SongCardImage;
