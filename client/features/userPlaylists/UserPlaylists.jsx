import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PlaylistCard from './PlaylistCard';
import * as userPlaylistsActions from './userPlaylistsActions';
import { getUserPlaylistIds } from './userPlaylistsSelectors';

const MaterialCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

class UserPlaylists extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentWillMount() {
    this.props.loadPlaylists();
  }

  render() {
    const { playlistIds } = this.props;

    return (
      <MaterialCardList>
        {playlistIds.map(
          playlistId =>
            playlistId && <PlaylistCard playlistId={playlistId} key={playlistId.toString()} />,
        )}
      </MaterialCardList>
    );
  }
}

UserPlaylists.defaultProps = {
  playlistIds: [],
};

UserPlaylists.propTypes = {
  playlistIds: PropTypes.arrayOf(PropTypes.number),
  loadPlaylists: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    playlistIds: getUserPlaylistIds(state),
  };
}

export default connect(mapStateToProps, userPlaylistsActions)(UserPlaylists);
