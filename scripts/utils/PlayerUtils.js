// This should be moved to util functions
export const computeNewTimeOnSeek = (mouseEvent, seekBar, duration) => {
  let offset = mouseEvent.clientX - seekBar.offsetLeft;
  let width = seekBar.offsetWidth;
  if (offset < 0) offset = 0;
  else if (offset > width) offset = width;
  let percent = offset * 1.0 / width;
  return Math.floor(duration * percent);
};


export const computeCurrentPercent = (currentTime, duration) => {
  let percent = currentTime * 100/ duration;
  percent = percent > 100 ? 100 : percent;
  percent = percent < 0 ? 0 : percent;
  return percent;
};
