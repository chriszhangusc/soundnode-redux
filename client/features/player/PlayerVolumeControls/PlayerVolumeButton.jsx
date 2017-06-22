import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { THEME_COLOR, WHITE } from 'client/app/css/colors';
import IconButton from 'client/common/components/buttons/IconButton';
import { getCurrentVolume } from '../playerSelectors';
import { toggleMute } from '../playerActions';

const Wrapper = styled.div`
  padding: 4px;
  font-size: 1.5rem;
  width: 30px;
  margin-left: 20px;
`;

function PlayerVolumeButton({ volume, handleOnClick }) {
  let type = null;
  switch (true) {
    case volume <= 0:
      type = 'mute';
      break;
    case volume > 0 && volume < 0.3:
      type = 'low';
      break;
    case volume >= 0.3 && volume < 0.7:
      type = 'medium';
      break;
    case volume >= 0.7 && volume <= 1:
      type = 'high';
      break;
    default:
      throw new Error('volume can not be greater than 1.0');
  }
  return (
    <Wrapper>
      <IconButton
        tooltipText="Adjust volume"
        iconClassName={`${`ion-volume-${type}`}`}
        onClick={handleOnClick}
        color={WHITE}
        hoverColor={THEME_COLOR}
      />
    </Wrapper>
  );
}

PlayerVolumeButton.defaultProps = {
  volume: 0.5,
};

PlayerVolumeButton.propTypes = {
  volume: PropTypes.number,
  handleOnClick: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    volume: getCurrentVolume(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleOnClick: () => {
      dispatch(toggleMute());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerVolumeButton);
