// This should be moved to util functions
export const computeNewTimeOnSeek = (mouseEvent, seekBar, duration) => {
  let offset = mouseEvent.clientX - seekBar.offsetLeft;
  let width = seekBar.offsetWidth;
  if (offset < 0) offset = 0;
  else if (offset > width) offset = width;
  let percent = offset * 1.0 / width;
  return Math.floor(duration * percent);
};
