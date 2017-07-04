import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
// import Icon from 'common/components/icons/Icon';
import PlayerButton from 'features/player/PlayerButton';
import { getIconNameByVolume } from 'features/player/playerUtils';
import { getCurrentVolume } from '../playerSelectors';
import { toggleMute } from '../playerActions';

const Wrapper = styled.div`
  padding: 4px;
  cursor: pointer;
`;

function PlayerVolumeButton({ volume, handleOnClick }) {
  const iconName = getIconNameByVolume(volume);
  return (
    <Wrapper>
      <PlayerButton tooltipText="Adjust volume" name={iconName} onClick={handleOnClick} />
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
