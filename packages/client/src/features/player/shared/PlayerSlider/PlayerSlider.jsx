import React from 'react';
import PropTypes from 'prop-types';
import { computePercentage } from '@soundnode-redux/client/src/features/player/playerUtils';
import Wrapper from './Wrapper';
import SeekBar from './SeekBar';
import SeekKnob from './SeekKnob';
import ProgressBar from './ProgressBar';

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
    <Wrapper onMouseDown={onProgressBarMouseDown} onMouseUp={onProgressBarMouseUp}>
      <SeekBar backgroundColor={seekBarColor} height={seekBarHeight}>
        <ProgressBar style={{ width: `${computePercentage(minValue, maxValue, currentValue)}%` }}>
          <SeekKnob
            onMouseDown={onSeekKnobMouseDown}
            onMouseMove={onSeekKnobMouseMove}
            onMouseUp={onSeekKnobMouseUp}
          />
        </ProgressBar>
      </SeekBar>
    </Wrapper>
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
