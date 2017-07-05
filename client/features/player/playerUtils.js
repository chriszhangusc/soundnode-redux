export function computeSeekPercentage(clientX, offsetLeft, offsetWidth) {
  let offset = clientX - offsetLeft;
  offset = offset < 0 ? 0 : offset;
  offset = offset > offsetWidth ? offsetWidth : offset;
  return offset * 1.0 / offsetWidth;
}

// This should be moved to util functions
export function computeOffset(component, maxValue, mouseEvent) {
  const rect = component.getBoundingClientRect();
  const percent = computeSeekPercentage(mouseEvent.clientX, rect.left, component.offsetWidth);
  return percent * maxValue;
}

export function computePercentage(min, max, cur) {
  let percent = cur * 100 / (max - min);
  percent = percent > 100 ? 100 : percent;
  percent = percent < 0 ? 0 : percent;
  return percent;
}

export function getIconNameByVolume(volume) {
  let iconName = null;
  switch (true) {
    case volume <= 0:
      iconName = 'volume-off';
      break;
    case volume > 0 && volume < 0.5:
      iconName = 'volume-down';
      break;
    case volume >= 0.5 && volume <= 1:
      iconName = 'volume-up';
      break;
    default:
      throw new Error('volume can not be greater than 1.0');
  }
  return iconName;
}
