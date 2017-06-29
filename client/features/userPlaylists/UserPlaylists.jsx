import React from 'react';
import SC from 'soundcloud';
import MaterialCard from 'common/components/MaterialCard';
import styled from 'styled-components';
import playlists from './data';

const MaterialCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

class UserPlaylists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
    };
  }

  componentWillMount() {
    // SC.get('/me/playlists', { limit: 10 }).then((playlists) => {
    //   this.setState({
    //     playlists,
    //   });
    // });
    this.setState({
      playlists,
    });
    console.log('Will mount');
  }

  render() {
    console.log(this.state.playlists);
    return (
      <MaterialCardList>
        {this.state.playlists.map(playlist => (
          <MaterialCard playlist={playlist} key={playlist.id} />
        ))}
      </MaterialCardList>
    );
  }
}

export default UserPlaylists;
