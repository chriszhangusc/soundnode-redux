import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { THEME_COLOR, WHITE } from 'client/app/css/colors';
import IconButton from 'client/common/components/Buttons/IconButton';
import { getCurrentVolume } from '../playerSelectors';
import { toggleMute } from '../playerActions';

const Wrapper = styled.div`
  padding: 4px;
  font-size: 1.5rem;
  width: 30px;
  &.active {
    color: ${THEME_COLOR};
  }

  margin-left: 30px;
`;

function mapStateToProps(state) {
  return {
    volume: getCurrentVolume(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClick: () => {
      dispatch(toggleMute());
    },
  };
}

function PlayerVolumeButton({ volume, onClick }) {
  let type = null;

  if (volume <= 0) {
    type = 'mute';
  } else if (volume > 0 && volume < 0.3) {
    type = 'low';
  } else if (volume >= 0.3 && volume < 0.7) {
    type = 'medium';
  } else {
    type = 'high';
  }

  return (
    <Wrapper>
      <IconButton
        iconClassName={`icon ${`ion-volume-${type}`}`}
        onClick={onClick}
        color={WHITE}
        hoverColor={THEME_COLOR}
      />
    </Wrapper>
  );
}

PlayerVolumeButton.defaultProps = {
  title: '',
};

PlayerVolumeButton.propTypes = {
  volume: PropTypes.number.isRequired,
  // title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerVolumeButton);
