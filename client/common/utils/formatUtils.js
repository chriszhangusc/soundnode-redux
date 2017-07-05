import moment from 'moment';

export const formatTitle = (title) => {
  const res = title.split(' - ');
  return res.length === 1 ? res[0] : res[1];
};

// If unit is not specified, then we assume duration is in miliseconds.
export function formatDuration(duration, unit) {
  // Convert duration to moment duration.
  const momentDuration = unit ? moment.duration(duration, unit) : moment.duration(duration);
  const durationStr = moment.utc(momentDuration.as('milliseconds')).format('HH:mm:ss');
  // if no HH equals to 00, cut it off
  if (durationStr.length === 8 && durationStr.startsWith('00:')) {
    return durationStr.slice(3);
  }
  return durationStr;
}
