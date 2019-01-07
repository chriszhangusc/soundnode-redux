import moment from 'moment';

export const formatTitle = (title) => {
  const res = title.split(' - ');
  return res.length === 1 ? res[0] : res[1];
};

export function formatDurationCompact(duration, unit) {
  // Convert duration to moment duration.
  const momentDuration = unit ? moment.duration(duration, unit) : moment.duration(duration);
  const durationStr = moment.utc(momentDuration.as('milliseconds')).format('HH:mm:ss');
  // if no HH equals to 00, cut it off
  if (durationStr.length === 8 && durationStr.startsWith('00:')) {
    return durationStr.slice(3);
  }
  return durationStr;
}

export function formatDuration(duration) {
  const momentDuration = moment.duration(duration);
  const durationStr = moment.utc(momentDuration.as('milliseconds')).format('HH:mm:ss');
  const parts = durationStr.split(':');
  return `${parts[0]}hours${parts[1]}minutes${parts[0]}seconds`;
}

// Format long big numbers to compact version: 32.3M, 43.3K
export function formatNumberCompact(value) {
  const thenThousand = 10000;
  const million = 1000000;
  const billion = 1000000000;
  const trillion = 1000000000000;
  if (value < thenThousand) {
    return value.toLocaleString();
  }

  if (value >= 10000 && value <= 1000000) {
    return `${(value / thenThousand).toFixed(1)}K`;
  }

  if (value >= million && value <= billion) {
    return `${(value / million).toFixed(1)}M`;
  }

  if (value >= billion && value <= trillion) {
    return `${(value / billion).toFixed(1)}B`;
  }
  return `${(value / trillion).toFixed(1)}T`;
}

