import React from 'react';
import SC from 'soundcloud';

class Playlists extends React.Component {
  componentWillMount() {
    SC.get('/me/playlists', { limit: 10 }).then((playlists) => {
      console.log(playlists);
    });
    console.log('Will mount');
  }

  render() {
    return <div>Playlists</div>;
  }
}

export default Playlists;
