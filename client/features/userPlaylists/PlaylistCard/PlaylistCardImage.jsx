import React from 'react';
import PropTypes from 'prop-types';
import { getTracksByPlaylistId } from 'features/entities/entitiesSelectors';
import { connect } from 'react-redux';
import { getLargeVersion } from 'common/utils/imageUtils';
import TrackImage from 'common/components/images/TrackImage';

function PlaylistCardImage({ playlistCoverImage }) {
  return <TrackImage src={playlistCoverImage} size="medium" />;
}

PlaylistCardImage.propTypes = {
  playlistCoverImage: PropTypes.string,
};

// { active, playing, imageUrl, handleImageClick }
function mapStateToProps(state, { playlistId }) {
  const tracks = getTracksByPlaylistId(state, playlistId);
  return {
    playlistCoverImage: tracks && getLargeVersion(tracks[0].artworkUrl),
  };
}

export default connect(mapStateToProps)(PlaylistCardImage);
