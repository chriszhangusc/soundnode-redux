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

function MaterialCardImage({ active, playing, imageUrl, handleImageClick }) {
  return (
    <Wrapper>
      <ShadowOverlay active={active} onClick={handleImageClick}>
        <PlaybackButtonIcon className={`${playing ? 'ion-ios-pause' : 'ion-ios-play'}`} />
      </ShadowOverlay>
      {imageUrl && <EnhancedImage src={imageUrl} />}
    </Wrapper>
  );
}

MaterialCardImage.defaultProps = {
  imageUrl: '',
  active: false,
  playing: false,
  handleImageClick: undefined,
};

MaterialCardImage.propTypes = {
  active: PropTypes.bool,
  playing: PropTypes.bool,
  imageUrl: PropTypes.string,
  handleImageClick: PropTypes.func,
};

export default MaterialCardImage;
