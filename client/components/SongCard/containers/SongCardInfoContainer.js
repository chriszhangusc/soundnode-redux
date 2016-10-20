// import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getArtistByTrackId } from 'client/redux/modules/reducers';
import SongCardInfo from '../components/SongCardInfo';

const mapStateToProps = (state, { track }) => {
  const artist = getArtistByTrackId(state, track.getId());
  return {
    trackId: track.getId(),
    title: track.getTitle(),
    artistAvatar: artist.getAvatarUrl(),
    artistName: artist.getUsername(),
    artistId: artist.getId()
  };
};

export default connect(mapStateToProps)(SongCardInfo);
