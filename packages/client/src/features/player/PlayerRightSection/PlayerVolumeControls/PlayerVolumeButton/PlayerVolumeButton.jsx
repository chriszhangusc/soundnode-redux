import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Icon from '@soundnode-redux/client/src/common/components/icons/Icon';
import PlayerButton from '@soundnode-redux/client/src/features/player/shared/PlayerButton';
import { getIconNameByVolume } from '@soundnode-redux/client/src/features/player/playerUtils';
import { getCurrentVolume } from '@soundnode-redux/client/src/features/player/playerSelectors';
import { toggleMute } from '@soundnode-redux/client/src/features/player/playerActions';
import Wrapper from './Wrapper';

function PlayerVolumeButton({ volume, handleOnClick }) {
  const iconName = getIconNameByVolume(volume);
  return (
    <Wrapper>
      <PlayerButton tooltipText="Adjust volume" iconName={iconName} onClick={handleOnClick} />
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
