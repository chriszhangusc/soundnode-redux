const computeSeekPercent = (clientX, offsetLeft, offsetWidth) => {
  let offset = clientX - offsetLeft;
  offset = offset < 0 ? 0 : offset;
  offset = offset > offsetWidth ? offsetWidth : offset;
  return (offset * 1.0) / offsetWidth;
};

// This should be moved to util functions
export const computeNewTimeOnSeek = (seekBar, duration, mouseEvent) => {
  let percent = computeSeekPercent(mouseEvent.clientX, seekBar.offsetLeft, seekBar.offsetWidth);
  return percent * duration;
};

export const computeNewVolumeOnSeek = (volumeBar, mouseEvent) => {
  let percent = computeSeekPercent(mouseEvent.clientX, volumeBar.offsetLeft, volumeBar.offsetWidth);
  return percent * 1.0;
}

export const computeSeekBarPercent = (currentTime, duration) => {
  let percent = (currentTime * 100) / duration;
  percent = percent > 100 ? 100 : percent;
  percent = percent < 0 ? 0 : percent;
  return percent;
};
