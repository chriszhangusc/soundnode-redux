// trackId={props.trackId}
// artistId={props.artistId}
// artistAvatar={props.artistAvatar}
// title={props.title}
// artistName={props.artistName}
// import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import SongCardInfo from '../components/SongCardInfo';

const mapStateToProps = (state, { track }) => ({
  title: track.getTitle(),
  artistAvatar: track.getArtist().getAvatarUrl(),
  artistName: track.getArtist().getUsername(),
  artistId: track.getArtist().getId()
});

export default connect(mapStateToProps)(SongCardInfo);
