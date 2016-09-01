var axios = require('axios');
var p = axios.get('https://api.soundcloud.com/tracks?genres=chill&linked_partitioning=1&client_id=f9e1e2232182a46705c880554a1011af&offset=0&limit=50').then((res) => {
  console.log('Fetch success');
  return '123';
});

console.log(typeof p === Promise);




// axios.get(xxx).then(resolve:return 'abc').then(resolve:'abc')
