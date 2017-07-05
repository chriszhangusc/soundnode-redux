import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { THEME_COLOR } from 'app/css/colors';
import { computePercentage } from 'features/player/playerUtils';

const SliderWrapper = styled.div`
  display: block;
  width: 100%;
  padding: 14px 0;
  cursor: pointer;
`;

const SeekBar = styled.div`
  position: relative;
  height: ${props => props.height || '3px'};
  ${props => props.backgroundColor && `background-color: ${props.backgroundColor}`};
  cursor: pointer;
  
`;

const SeekKnob = styled.div`
  position: absolute;
  top: -16px;
  right: -21px;
  margin: 10px;
  width: 14px;
  height: 14px;
  background-color: ${THEME_COLOR};
  border-radius: 50%;
  border: 2px solid ${THEME_COLOR};
  cursor: pointer;
`;

const ProgressBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: ${THEME_COLOR};
  cursor: pointer;
`;

function PlayerSlider(props) {
  const {
    minValue,
    maxValue,
    currentValue,
    // seekBarRef,
    onSeekKnobMouseUp,
    onSeekKnobMouseDown,
    onSeekKnobMouseMove,
    onProgressBarMouseUp,
    onProgressBarMouseDown,
    seekBarColor,
    seekBarHeight,
  } = props;
  return (
    <SliderWrapper onMouseDown={onProgressBarMouseDown} onMouseUp={onProgressBarMouseUp}>
      <SeekBar backgroundColor={seekBarColor} height={seekBarHeight}>
        <ProgressBar style={{ width: `${computePercentage(minValue, maxValue, currentValue)}%` }}>
          <SeekKnob
            onMouseDown={onSeekKnobMouseDown}
            onMouseMove={onSeekKnobMouseMove}
            onMouseUp={onSeekKnobMouseUp}
          />
        </ProgressBar>
      </SeekBar>
    </SliderWrapper>
  );
}

PlayerSlider.defaultProps = {
  minValue: 0,
};

PlayerSlider.propTypes = {
  minValue: PropTypes.number,
  maxValue: PropTypes.number.isRequired,
  currentValue: PropTypes.number.isRequired,
  onSeekKnobMouseUp: PropTypes.func,
  onSeekKnobMouseDown: PropTypes.func,
  onSeekKnobMouseMove: PropTypes.func,
  onProgressBarMouseUp: PropTypes.func,
  onProgressBarMouseDown: PropTypes.func,
  seekBarColor: PropTypes.string,
  seekBarHeight: PropTypes.string,
};

export default PlayerSlider;
