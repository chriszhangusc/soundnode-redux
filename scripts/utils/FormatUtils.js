export const formatSecondsAsTime = (secs) => {
  let hr  = Math.floor(secs / 3600);
  let min = Math.floor((secs - (hr * 3600)) / 60);
  let sec = Math.floor(secs - (hr * 3600) -  (min * 60));
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec  = "0" + sec;
  }
  return min + ':' + sec;
};

export const formatImageUrl = (imageUrl) => {
  let formattedUrl = '';
  if (imageUrl)
    formattedUrl = imageUrl.replace('large', 't300x300');
  return formattedUrl;
};

export const formatTitle = (title) => {
  const res = title.split(' - ');
  return res.length === 1 ? res[0] : res[1];
}
