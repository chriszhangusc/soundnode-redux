const SOUNDCLOUD_API_V2 = 'https://api-v2.soundcloud.com/';

export function getCharts(genre) {

  const params = {
    kind: 'top',
    genre: 'soundcloud:genres:'+genre,
    limit: 50
  };
        return sendRequest('charts', { params: params })
            .then(onResponseSuccess)
            .then(updateNextPageUrl)
            .catch(onResponseError);
}

function sendRequest() {
  
}
