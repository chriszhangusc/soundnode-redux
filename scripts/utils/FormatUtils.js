export const formatSecondsAsTime = (secs, format) => {
  var hr  = Math.floor(secs / 3600);
  var min = Math.floor((secs - (hr * 3600))/60);
  var sec = Math.floor(secs - (hr * 3600) -  (min * 60));
  if (min < 10){
    min = "0" + min;
  }
  if (sec < 10){
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
