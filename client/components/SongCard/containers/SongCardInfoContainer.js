// import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getArtistByTrackId } from 'client/redux/modules/entities';
import SongCardInfo from '../components/SongCardInfo';

const mapStateToProps = (state, { track }) => {
  const artist = getArtistByTrackId(state, track.id);
  return {
    trackId: track.id,
    title: track.title,
    artistAvatar: artist.avatarUrl,
    artistName: artist.username,
    artistId: artist.id,
  };
};

export default connect(mapStateToProps)(SongCardInfo);
