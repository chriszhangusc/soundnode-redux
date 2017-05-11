export function computeSeekPercent(clientX, offsetLeft, offsetWidth) {
  let offset = clientX - offsetLeft;
  offset = offset < 0 ? 0 : offset;
  offset = offset > offsetWidth ? offsetWidth : offset;
  return (offset * 1.0) / offsetWidth;
}

// This should be moved to util functions
export function computeNewTimeOnSeek(seekBar, duration, mouseEvent) {
  const percent = computeSeekPercent(mouseEvent.clientX, seekBar.offsetLeft, seekBar.offsetWidth);
  return percent * duration;
}

export function computeNewVolumeOnSeek(volumeBar, mouseEvent) {
  const percent = computeSeekPercent(
    mouseEvent.clientX, volumeBar.offsetLeft, volumeBar.offsetWidth,
  );
  return percent * 1.0;
}

export function computeSeekBarPercent(currentTime, duration) {
  let percent = (currentTime * 100) / duration;
  percent = percent > 100 ? 100 : percent;
  percent = percent < 0 ? 0 : percent;
  return percent;
}
