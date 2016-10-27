// import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getArtistByTrackId } from 'client/redux/modules/entities';
import SongCardInfo from '../components/SongCardInfo';

const mapStateToProps = (state, { track }) => {
  const artist = getArtistByTrackId(state, track.get('id'));
  return {
    trackId: track.get('id'),
    title: track.get('title'),
    artistAvatar: artist.get('avatarUrl'),
    artistName: artist.get('username'),
    artistId: artist.get('id'),
  };
};

export default connect(mapStateToProps)(SongCardInfo);
